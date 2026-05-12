-- =============================================
-- Stored Procedure: Create Order with Stock Management
-- This procedure handles order creation and stock deduction atomically
-- =============================================
USE FashionStoreDb;
GO

IF OBJECT_ID('dbo.sp_CreateOrderWithStockManagement', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_CreateOrderWithStockManagement;
GO

CREATE PROCEDURE dbo.sp_CreateOrderWithStockManagement
    @UserId INT,
    @VoucherId INT = NULL,
    @ShippingName NVARCHAR(200),
    @ShippingPhone NVARCHAR(20),
    @ShippingEmail NVARCHAR(255),
    @ShippingAddress NVARCHAR(500),
    @City NVARCHAR(100) = NULL,
    @District NVARCHAR(100) = NULL,
    @Ward NVARCHAR(100) = NULL,
    @Note NVARCHAR(1000) = NULL,
    @PaymentMethod NVARCHAR(20) = 'COD',
    @ShippingFee DECIMAL(18,2) = 0,
    @OrderItemsJson NVARCHAR(MAX) -- JSON array of order items
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON; -- Automatically rollback on error
    
    DECLARE @OrderId INT;
    DECLARE @OrderCode NVARCHAR(50);
    DECLARE @Subtotal DECIMAL(18,2) = 0;
    DECLARE @DiscountAmount DECIMAL(18,2) = 0;
    DECLARE @TotalAmount DECIMAL(18,2) = 0;
    DECLARE @ErrorMessage NVARCHAR(500);
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Generate unique order code
        SET @OrderCode = 'ORD' + FORMAT(GETDATE(), 'yyyyMMddHHmmss') + RIGHT('000' + CAST(@UserId AS NVARCHAR), 3);
        
        -- Parse order items from JSON
        DECLARE @OrderItems TABLE (
            ProductId INT,
            ProductVariantId INT,
            ProductName NVARCHAR(200),
            ColorName NVARCHAR(50),
            SizeName NVARCHAR(20),
            UnitPrice DECIMAL(18,2),
            Quantity INT,
            LineTotal DECIMAL(18,2)
        );
        
        INSERT INTO @OrderItems (ProductId, ProductVariantId, ProductName, ColorName, SizeName, UnitPrice, Quantity, LineTotal)
        SELECT 
            ProductId,
            ProductVariantId,
            ProductName,
            ColorName,
            SizeName,
            UnitPrice,
            Quantity,
            UnitPrice * Quantity AS LineTotal
        FROM OPENJSON(@OrderItemsJson)
        WITH (
            ProductId INT '$.productId',
            ProductVariantId INT '$.productVariantId',
            ProductName NVARCHAR(200) '$.productName',
            ColorName NVARCHAR(50) '$.colorName',
            SizeName NVARCHAR(20) '$.sizeName',
            UnitPrice DECIMAL(18,2) '$.unitPrice',
            Quantity INT '$.quantity'
        );
        
        -- Validate stock availability for all items
        DECLARE @ProductVariantId INT;
        DECLARE @RequestedQuantity INT;
        DECLARE @AvailableStock INT;
        DECLARE @ProductName NVARCHAR(200);
        
        DECLARE stock_cursor CURSOR FOR
        SELECT ProductVariantId, Quantity, ProductName FROM @OrderItems;
        
        OPEN stock_cursor;
        FETCH NEXT FROM stock_cursor INTO @ProductVariantId, @RequestedQuantity, @ProductName;
        
        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Check stock
            SELECT @AvailableStock = StockQuantity
            FROM dbo.ProductVariants
            WHERE Id = @ProductVariantId;
            
            IF @AvailableStock IS NULL
            BEGIN
                SET @ErrorMessage = N'Sản phẩm "' + @ProductName + N'" không tồn tại';
                RAISERROR(@ErrorMessage, 16, 1);
            END
            
            IF @AvailableStock < @RequestedQuantity
            BEGIN
                SET @ErrorMessage = N'Sản phẩm "' + @ProductName + N'" chỉ còn ' + CAST(@AvailableStock AS NVARCHAR) + N' sản phẩm trong kho';
                RAISERROR(@ErrorMessage, 16, 1);
            END
            
            FETCH NEXT FROM stock_cursor INTO @ProductVariantId, @RequestedQuantity, @ProductName;
        END
        
        CLOSE stock_cursor;
        DEALLOCATE stock_cursor;
        
        -- Calculate subtotal
        SELECT @Subtotal = SUM(LineTotal) FROM @OrderItems;
        
        -- Apply voucher discount if provided
        IF @VoucherId IS NOT NULL
        BEGIN
            DECLARE @VoucherCode NVARCHAR(50);
            DECLARE @DiscountType NVARCHAR(20);
            DECLARE @DiscountValue DECIMAL(18,2);
            DECLARE @MinOrderAmount DECIMAL(18,2);
            DECLARE @MaxDiscountAmount DECIMAL(18,2);
            DECLARE @VoucherStatus NVARCHAR(20);
            DECLARE @StartDate DATETIME2;
            DECLARE @EndDate DATETIME2;
            DECLARE @TotalQuantity INT;
            DECLARE @UsedQuantity INT;
            
            SELECT 
                @VoucherCode = Code,
                @DiscountType = DiscountType,
                @DiscountValue = DiscountValue,
                @MinOrderAmount = MinOrderAmount,
                @MaxDiscountAmount = MaxDiscountAmount,
                @VoucherStatus = Status,
                @StartDate = StartDate,
                @EndDate = EndDate,
                @TotalQuantity = TotalQuantity,
                @UsedQuantity = UsedQuantity
            FROM dbo.Vouchers
            WHERE Id = @VoucherId;
            
            -- Validate voucher
            IF @VoucherStatus != 'active'
            BEGIN
                RAISERROR(N'Mã giảm giá không hợp lệ hoặc đã hết hạn', 16, 1);
            END
            
            IF GETDATE() < @StartDate OR GETDATE() > @EndDate
            BEGIN
                RAISERROR(N'Mã giảm giá chưa có hiệu lực hoặc đã hết hạn', 16, 1);
            END
            
            IF @TotalQuantity IS NOT NULL AND @UsedQuantity >= @TotalQuantity
            BEGIN
                RAISERROR(N'Mã giảm giá đã hết lượt sử dụng', 16, 1);
            END
            
            IF @MinOrderAmount IS NOT NULL AND @Subtotal < @MinOrderAmount
            BEGIN
                SET @ErrorMessage = N'Đơn hàng phải từ ' + FORMAT(@MinOrderAmount, 'N0') + N'đ để sử dụng mã này';
                RAISERROR(@ErrorMessage, 16, 1);
            END
            
            -- Calculate discount
            IF @DiscountType = 'percentage'
            BEGIN
                SET @DiscountAmount = @Subtotal * (@DiscountValue / 100);
                IF @MaxDiscountAmount IS NOT NULL AND @DiscountAmount > @MaxDiscountAmount
                    SET @DiscountAmount = @MaxDiscountAmount;
            END
            ELSE -- fixed
            BEGIN
                SET @DiscountAmount = @DiscountValue;
            END
            
            -- Update voucher used quantity
            UPDATE dbo.Vouchers
            SET UsedQuantity = UsedQuantity + 1,
                UpdatedAt = GETDATE()
            WHERE Id = @VoucherId;
        END
        
        -- Calculate total
        SET @TotalAmount = @Subtotal + @ShippingFee - @DiscountAmount;
        
        -- Create order
        INSERT INTO dbo.Orders (
            OrderCode, UserId, VoucherId, Status, PaymentMethod, PaymentStatus,
            ShippingName, ShippingPhone, ShippingEmail, ShippingAddress,
            City, District, Ward, Note,
            Subtotal, ShippingFee, DiscountAmount, TotalAmount
        )
        VALUES (
            @OrderCode, @UserId, @VoucherId, 'pending', @PaymentMethod, 'pending',
            @ShippingName, @ShippingPhone, @ShippingEmail, @ShippingAddress,
            @City, @District, @Ward, @Note,
            @Subtotal, @ShippingFee, @DiscountAmount, @TotalAmount
        );
        
        SET @OrderId = SCOPE_IDENTITY();
        
        -- Insert order items
        INSERT INTO dbo.OrderItems (
            OrderId, ProductId, ProductVariantId, ProductNameSnapshot,
            ColorSnapshot, SizeSnapshot, UnitPrice, Quantity, LineTotal
        )
        SELECT 
            @OrderId, ProductId, ProductVariantId, ProductName,
            ColorName, SizeName, UnitPrice, Quantity, LineTotal
        FROM @OrderItems;
        
        -- Deduct stock for each item
        UPDATE pv
        SET pv.StockQuantity = pv.StockQuantity - oi.Quantity
        FROM dbo.ProductVariants pv
        INNER JOIN @OrderItems oi ON pv.Id = oi.ProductVariantId;
        
        -- Update product sold count
        UPDATE p
        SET p.SoldCount = p.SoldCount + oi.Quantity
        FROM dbo.Products p
        INNER JOIN @OrderItems oi ON p.Id = oi.ProductId;
        
        COMMIT TRANSACTION;
        
        -- Return created order
        SELECT 
            o.*,
            (
                SELECT 
                    oi.Id,
                    oi.ProductId,
                    oi.ProductVariantId,
                    oi.ProductNameSnapshot,
                    oi.ColorSnapshot,
                    oi.SizeSnapshot,
                    oi.UnitPrice,
                    oi.Quantity,
                    oi.LineTotal
                FROM dbo.OrderItems oi
                WHERE oi.OrderId = o.Id
                FOR JSON PATH
            ) AS OrderItemsJson
        FROM dbo.Orders o
        WHERE o.Id = @OrderId;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        DECLARE @ErrorMsg NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMsg, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO

PRINT 'Stored procedure sp_CreateOrderWithStockManagement created successfully!';
GO

-- =============================================
-- Example Usage
-- =============================================
/*
DECLARE @OrderItemsJson NVARCHAR(MAX) = N'[
    {
        "productId": 1,
        "productVariantId": 1,
        "productName": "Áo thun Premium Cotton",
        "colorName": "Đen",
        "sizeName": "M",
        "unitPrice": 599000,
        "quantity": 2
    },
    {
        "productId": 2,
        "productVariantId": 9,
        "productName": "Áo sơ mi Slim Fit",
        "colorName": "Trắng",
        "sizeName": "L",
        "unitPrice": 749000,
        "quantity": 1
    }
]';

EXEC dbo.sp_CreateOrderWithStockManagement
    @UserId = 1,
    @VoucherId = 1,
    @ShippingName = N'Nguyễn Văn A',
    @ShippingPhone = '0901234567',
    @ShippingEmail = 'nguyenvana@email.com',
    @ShippingAddress = N'123 Đường ABC',
    @City = N'Hồ Chí Minh',
    @District = N'Quận 1',
    @Ward = N'Phường Bến Nghé',
    @Note = N'Giao hàng giờ hành chính',
    @PaymentMethod = 'COD',
    @ShippingFee = 30000,
    @OrderItemsJson = @OrderItemsJson;
*/
