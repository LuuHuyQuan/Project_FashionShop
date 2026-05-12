-- =============================================
-- Seed ProductVariants with Stock Data
-- Run this after creating Products
-- =============================================
USE FashionStoreDb;
GO

-- First, let's create some sample products
-- Check if products exist, if not create them
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 1)
BEGIN
    SET IDENTITY_INSERT dbo.Products ON;
    
    INSERT INTO dbo.Products (Id, CategoryId, Name, Slug, Description, Price, OldPrice, Status, Badge, RatingAverage, ReviewCount, SoldCount)
    VALUES
    (1, 1, N'Áo thun Premium Cotton', N'ao-thun-premium-cotton', N'Áo thun Premium Cotton được làm từ 100% cotton cao cấp', 599000, 799000, N'active', N'Sale', 5.00, 284, 1240),
    (2, 1, N'Áo sơ mi Slim Fit', N'ao-so-mi-slim-fit', N'Áo sơ mi Slim Fit với thiết kế ôm vừa vặn', 749000, NULL, N'active', N'New', 4.00, 165, 860),
    (3, 1, N'Quần jeans Skinny', N'quan-jeans-skinny', N'Quần jeans Skinny với form dáng ôm sát', 899000, NULL, N'active', N'Hot', 5.00, 213, 2100),
    (4, 1, N'Áo khoác Bomber', N'ao-khoac-bomber', N'Áo khoác Bomber phong cách streetwear', 1299000, NULL, N'active', N'Trend', 4.00, 98, 645),
    (5, 2, N'Váy đầm Maxi', N'vay-dam-maxi', N'Váy đầm Maxi dài thanh lịch', 950000, 1200000, N'active', N'Sale', 5.00, 156, 980),
    (6, 1, N'Áo thun Oversized', N'ao-thun-oversized', N'Áo thun Oversized form rộng thoải mái', 549000, NULL, N'active', NULL, 5.00, 189, 1560),
    (7, 1, N'Quần shorts thể thao', N'quan-shorts-the-thao', N'Quần shorts thể thao năng động', 399000, 499000, N'active', N'Sale', 4.00, 142, 890),
    (8, 1, N'Áo polo Classic', N'ao-polo-classic', N'Áo polo Classic thanh lịch', 699000, NULL, N'active', NULL, 5.00, 76, 350),
    (9, 1, N'Quần kaki Chinos', N'quan-kaki-chinos', N'Quần kaki Chinos lịch sự', 799000, NULL, N'active', N'New', 4.00, 55, 280),
    (10, 1, N'Áo len Cardigan', N'ao-len-cardigan', N'Áo len Cardigan ấm áp', 850000, NULL, N'active', N'Mới', 5.00, 92, 420);
    
    SET IDENTITY_INSERT dbo.Products OFF;
END
GO

-- Now seed ProductVariants with realistic stock quantities
-- Product 1: Áo thun Premium Cotton (4 colors x 5 sizes = 20 variants)
DECLARE @ProductId INT = 1;
DECLARE @ColorId INT;
DECLARE @SizeId INT;
DECLARE @SKU NVARCHAR(80);
DECLARE @StockQuantity INT;

-- Đen (ColorId = 1)
SET @ColorId = 1;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, @ColorId, 1, 'ATPC-BLACK-S', 50, NULL),
(@ProductId, @ColorId, 2, 'ATPC-BLACK-M', 80, NULL),
(@ProductId, @ColorId, 3, 'ATPC-BLACK-L', 100, NULL),
(@ProductId, @ColorId, 4, 'ATPC-BLACK-XL', 60, NULL);

-- Trắng (ColorId = 2)
SET @ColorId = 2;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, @ColorId, 1, 'ATPC-WHITE-S', 45, NULL),
(@ProductId, @ColorId, 2, 'ATPC-WHITE-M', 75, NULL),
(@ProductId, @ColorId, 3, 'ATPC-WHITE-L', 90, NULL),
(@ProductId, @ColorId, 4, 'ATPC-WHITE-XL', 55, NULL);

-- Xanh (ColorId = 3)
SET @ColorId = 3;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, @ColorId, 1, 'ATPC-BLUE-S', 30, NULL),
(@ProductId, @ColorId, 2, 'ATPC-BLUE-M', 50, NULL),
(@ProductId, @ColorId, 3, 'ATPC-BLUE-L', 70, NULL),
(@ProductId, @ColorId, 4, 'ATPC-BLUE-XL', 40, NULL);

-- Đỏ (ColorId = 4)
SET @ColorId = 4;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, @ColorId, 1, 'ATPC-RED-S', 20, NULL),
(@ProductId, @ColorId, 2, 'ATPC-RED-M', 35, NULL),
(@ProductId, @ColorId, 3, 'ATPC-RED-L', 45, NULL),
(@ProductId, @ColorId, 4, 'ATPC-RED-XL', 25, NULL);

-- Product 2: Áo sơ mi Slim Fit
SET @ProductId = 2;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 2, 1, 'ASSM-WHITE-S', 40, NULL),
(@ProductId, 2, 2, 'ASSM-WHITE-M', 60, NULL),
(@ProductId, 2, 3, 'ASSM-WHITE-L', 50, NULL),
(@ProductId, 2, 4, 'ASSM-WHITE-XL', 30, NULL),
(@ProductId, 3, 1, 'ASSM-BLUE-S', 35, NULL),
(@ProductId, 3, 2, 'ASSM-BLUE-M', 55, NULL),
(@ProductId, 3, 3, 'ASSM-BLUE-L', 45, NULL),
(@ProductId, 3, 4, 'ASSM-BLUE-XL', 25, NULL);

-- Product 3: Quần jeans Skinny
SET @ProductId = 3;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 1, 1, 'QJS-BLACK-S', 60, NULL),
(@ProductId, 1, 2, 'QJS-BLACK-M', 90, NULL),
(@ProductId, 1, 3, 'QJS-BLACK-L', 100, NULL),
(@ProductId, 1, 4, 'QJS-BLACK-XL', 70, NULL),
(@ProductId, 3, 1, 'QJS-BLUE-S', 55, NULL),
(@ProductId, 3, 2, 'QJS-BLUE-M', 85, NULL),
(@ProductId, 3, 3, 'QJS-BLUE-L', 95, NULL),
(@ProductId, 3, 4, 'QJS-BLUE-XL', 65, NULL);

-- Product 4: Áo khoác Bomber
SET @ProductId = 4;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 1, 2, 'AKB-BLACK-M', 40, NULL),
(@ProductId, 1, 3, 'AKB-BLACK-L', 50, NULL),
(@ProductId, 1, 4, 'AKB-BLACK-XL', 35, NULL),
(@ProductId, 4, 2, 'AKB-RED-M', 25, NULL),
(@ProductId, 4, 3, 'AKB-RED-L', 30, NULL),
(@ProductId, 4, 4, 'AKB-RED-XL', 20, NULL);

-- Product 5: Váy đầm Maxi
SET @ProductId = 5;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 4, 1, 'VDM-RED-S', 30, NULL),
(@ProductId, 4, 2, 'VDM-RED-M', 45, NULL),
(@ProductId, 4, 3, 'VDM-RED-L', 40, NULL),
(@ProductId, 1, 1, 'VDM-BLACK-S', 25, NULL),
(@ProductId, 1, 2, 'VDM-BLACK-M', 40, NULL),
(@ProductId, 1, 3, 'VDM-BLACK-L', 35, NULL);

-- Product 6: Áo thun Oversized
SET @ProductId = 6;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 2, 2, 'ATO-WHITE-M', 70, NULL),
(@ProductId, 2, 3, 'ATO-WHITE-L', 90, NULL),
(@ProductId, 2, 4, 'ATO-WHITE-XL', 60, NULL),
(@ProductId, 1, 2, 'ATO-BLACK-M', 65, NULL),
(@ProductId, 1, 3, 'ATO-BLACK-L', 85, NULL),
(@ProductId, 1, 4, 'ATO-BLACK-XL', 55, NULL);

-- Product 7: Quần shorts thể thao
SET @ProductId = 7;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 1, 1, 'QSTT-BLACK-S', 50, NULL),
(@ProductId, 1, 2, 'QSTT-BLACK-M', 70, NULL),
(@ProductId, 1, 3, 'QSTT-BLACK-L', 60, NULL),
(@ProductId, 3, 1, 'QSTT-BLUE-S', 45, NULL),
(@ProductId, 3, 2, 'QSTT-BLUE-M', 65, NULL),
(@ProductId, 3, 3, 'QSTT-BLUE-L', 55, NULL);

-- Product 8: Áo polo Classic
SET @ProductId = 8;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 2, 1, 'APC-WHITE-S', 35, NULL),
(@ProductId, 2, 2, 'APC-WHITE-M', 50, NULL),
(@ProductId, 2, 3, 'APC-WHITE-L', 45, NULL),
(@ProductId, 2, 4, 'APC-WHITE-XL', 30, NULL),
(@ProductId, 1, 1, 'APC-BLACK-S', 30, NULL),
(@ProductId, 1, 2, 'APC-BLACK-M', 45, NULL),
(@ProductId, 1, 3, 'APC-BLACK-L', 40, NULL),
(@ProductId, 1, 4, 'APC-BLACK-XL', 25, NULL);

-- Product 9: Quần kaki Chinos
SET @ProductId = 9;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 1, 2, 'QKC-BLACK-M', 40, NULL),
(@ProductId, 1, 3, 'QKC-BLACK-L', 50, NULL),
(@ProductId, 1, 4, 'QKC-BLACK-XL', 35, NULL),
(@ProductId, 3, 2, 'QKC-BLUE-M', 35, NULL),
(@ProductId, 3, 3, 'QKC-BLUE-L', 45, NULL),
(@ProductId, 3, 4, 'QKC-BLUE-XL', 30, NULL);

-- Product 10: Áo len Cardigan
SET @ProductId = 10;
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(@ProductId, 1, 1, 'ALC-BLACK-S', 25, NULL),
(@ProductId, 1, 2, 'ALC-BLACK-M', 40, NULL),
(@ProductId, 1, 3, 'ALC-BLACK-L', 35, NULL),
(@ProductId, 1, 4, 'ALC-BLACK-XL', 20, NULL),
(@ProductId, 2, 1, 'ALC-WHITE-S', 20, NULL),
(@ProductId, 2, 2, 'ALC-WHITE-M', 35, NULL),
(@ProductId, 2, 3, 'ALC-WHITE-L', 30, NULL),
(@ProductId, 2, 4, 'ALC-WHITE-XL', 15, NULL);

GO

-- Add some low stock and out of stock variants for testing
INSERT INTO dbo.ProductVariants (ProductId, ColorId, SizeId, SKU, StockQuantity, PriceOverride)
VALUES
(1, 4, 1, 'ATPC-RED-XXS', 3, NULL),  -- Low stock (3 items)
(2, 4, 1, 'ASSM-RED-S', 0, NULL),    -- Out of stock
(3, 4, 1, 'QJS-RED-S', 1, NULL),     -- Very low stock (1 item)
(4, 3, 1, 'AKB-BLUE-S', 5, NULL);    -- Low stock (5 items)

GO

PRINT 'ProductVariants seeded successfully!';
PRINT 'Total variants created: ' + CAST((SELECT COUNT(*) FROM dbo.ProductVariants) AS NVARCHAR(10));
GO

-- Query to verify stock levels
SELECT 
    p.Name AS ProductName,
    c.Name AS Color,
    s.Name AS Size,
    pv.SKU,
    pv.StockQuantity,
    CASE 
        WHEN pv.StockQuantity = 0 THEN N'Hết hàng'
        WHEN pv.StockQuantity <= 5 THEN N'Sắp hết'
        WHEN pv.StockQuantity <= 20 THEN N'Còn ít'
        ELSE N'Còn hàng'
    END AS StockStatus
FROM dbo.ProductVariants pv
INNER JOIN dbo.Products p ON pv.ProductId = p.Id
INNER JOIN dbo.Colors c ON pv.ColorId = c.Id
INNER JOIN dbo.Sizes s ON pv.SizeId = s.Id
ORDER BY p.Name, c.Name, s.Name;
GO
