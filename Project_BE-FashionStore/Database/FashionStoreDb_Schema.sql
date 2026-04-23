-- FashionStore SQL Server schema
-- Run this script in SQL Server Management Studio

IF DB_ID('FashionStoreDb') IS NULL
BEGIN
    CREATE DATABASE FashionStoreDb;
END
GO

USE FashionStoreDb;
GO

-- Drop tables in correct order (child tables first)
IF OBJECT_ID('dbo.WishlistItems', 'U') IS NOT NULL DROP TABLE dbo.WishlistItems;
IF OBJECT_ID('dbo.Reviews', 'U') IS NOT NULL DROP TABLE dbo.Reviews;
IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.CartItems', 'U') IS NOT NULL DROP TABLE dbo.CartItems;
IF OBJECT_ID('dbo.Carts', 'U') IS NOT NULL DROP TABLE dbo.Carts;
IF OBJECT_ID('dbo.Addresses', 'U') IS NOT NULL DROP TABLE dbo.Addresses;
IF OBJECT_ID('dbo.RefreshTokens', 'U') IS NOT NULL DROP TABLE dbo.RefreshTokens;
IF OBJECT_ID('dbo.ProductImages', 'U') IS NOT NULL DROP TABLE dbo.ProductImages;
IF OBJECT_ID('dbo.ProductVariants', 'U') IS NOT NULL DROP TABLE dbo.ProductVariants;
IF OBJECT_ID('dbo.Colors', 'U') IS NOT NULL DROP TABLE dbo.Colors;
IF OBJECT_ID('dbo.Sizes', 'U') IS NOT NULL DROP TABLE dbo.Sizes;
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL DROP TABLE dbo.Categories;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

-- Users table
CREATE TABLE dbo.Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(200) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL CONSTRAINT DF_Users_Role DEFAULT 'customer',
    Status NVARCHAR(20) NOT NULL CONSTRAINT DF_Users_Status DEFAULT 'active',
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);
GO

-- RefreshTokens table
CREATE TABLE dbo.RefreshTokens (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Token NVARCHAR(500) NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_RefreshTokens_CreatedAt DEFAULT SYSUTCDATETIME(),
    RevokedAt DATETIME2 NULL,
    CONSTRAINT UQ_RefreshTokens_Token UNIQUE (Token),
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO

-- Categories table
CREATE TABLE dbo.Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Slug NVARCHAR(180) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Status NVARCHAR(20) NOT NULL CONSTRAINT DF_Categories_Status DEFAULT 'active',
    CONSTRAINT UQ_Categories_Slug UNIQUE (Slug)
);
GO

-- Products table
CREATE TABLE dbo.Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(220) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Price DECIMAL(18,2) NOT NULL,
    OldPrice DECIMAL(18,2) NULL,
    Status NVARCHAR(20) NOT NULL CONSTRAINT DF_Products_Status DEFAULT 'active',
    Badge NVARCHAR(50) NULL,
    RatingAverage DECIMAL(3,2) NOT NULL CONSTRAINT DF_Products_RatingAverage DEFAULT 0,
    ReviewCount INT NOT NULL CONSTRAINT DF_Products_ReviewCount DEFAULT 0,
    SoldCount INT NOT NULL CONSTRAINT DF_Products_SoldCount DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Products_CreatedAt DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT UQ_Products_Slug UNIQUE (Slug),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id)
);
GO

-- ProductImages table
CREATE TABLE dbo.ProductImages (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    Url NVARCHAR(500) NOT NULL,
    IsThumbnail BIT NOT NULL CONSTRAINT DF_ProductImages_IsThumbnail DEFAULT 0,
    SortOrder INT NOT NULL CONSTRAINT DF_ProductImages_SortOrder DEFAULT 0,
    CONSTRAINT FK_ProductImages_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
);
GO

-- Colors table
CREATE TABLE dbo.Colors (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    HexCode NVARCHAR(20) NOT NULL
);
GO

-- Sizes table
CREATE TABLE dbo.Sizes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(20) NOT NULL
);
GO

-- ProductVariants table
CREATE TABLE dbo.ProductVariants (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    ColorId INT NOT NULL,
    SizeId INT NOT NULL,
    SKU NVARCHAR(80) NOT NULL,
    StockQuantity INT NOT NULL CONSTRAINT DF_ProductVariants_StockQuantity DEFAULT 0,
    PriceOverride DECIMAL(18,2) NULL,
    CONSTRAINT UQ_ProductVariants_SKU UNIQUE (SKU),
    CONSTRAINT FK_ProductVariants_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ProductVariants_Colors FOREIGN KEY (ColorId) REFERENCES dbo.Colors(Id),
    CONSTRAINT FK_ProductVariants_Sizes FOREIGN KEY (SizeId) REFERENCES dbo.Sizes(Id)
);
GO

-- Carts table
CREATE TABLE dbo.Carts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    UpdatedAt DATETIME2 NOT NULL CONSTRAINT DF_Carts_UpdatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Carts_UserId UNIQUE (UserId),
    CONSTRAINT FK_Carts_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO

-- CartItems table
CREATE TABLE dbo.CartItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CartId INT NOT NULL,
    ProductVariantId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPriceSnapshot DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_CartItems_Carts FOREIGN KEY (CartId) REFERENCES dbo.Carts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_CartItems_ProductVariants FOREIGN KEY (ProductVariantId) REFERENCES dbo.ProductVariants(Id)
);
GO

-- Orders table
CREATE TABLE dbo.Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderCode NVARCHAR(50) NOT NULL,
    UserId INT NOT NULL,
    Status NVARCHAR(20) NOT NULL CONSTRAINT DF_Orders_Status DEFAULT 'pending',
    PaymentMethod NVARCHAR(20) NOT NULL CONSTRAINT DF_Orders_PaymentMethod DEFAULT 'COD',
    PaymentStatus NVARCHAR(20) NOT NULL CONSTRAINT DF_Orders_PaymentStatus DEFAULT 'pending',
    ShippingName NVARCHAR(200) NOT NULL,
    ShippingPhone NVARCHAR(20) NOT NULL,
    ShippingEmail NVARCHAR(255) NOT NULL,
    ShippingAddress NVARCHAR(500) NOT NULL,
    City NVARCHAR(100) NULL,
    District NVARCHAR(100) NULL,
    Ward NVARCHAR(100) NULL,
    Note NVARCHAR(1000) NULL,
    Subtotal DECIMAL(18,2) NOT NULL,
    ShippingFee DECIMAL(18,2) NOT NULL CONSTRAINT DF_Orders_ShippingFee DEFAULT 0,
    DiscountAmount DECIMAL(18,2) NOT NULL CONSTRAINT DF_Orders_DiscountAmount DEFAULT 0,
    TotalAmount DECIMAL(18,2) NOT NULL,
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Orders_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Orders_OrderCode UNIQUE (OrderCode),
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
);
GO

-- OrderItems table
CREATE TABLE dbo.OrderItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    ProductVariantId INT NULL,
    ProductNameSnapshot NVARCHAR(200) NOT NULL,
    ColorSnapshot NVARCHAR(50) NULL,
    SizeSnapshot NVARCHAR(20) NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Quantity INT NOT NULL,
    LineTotal DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id),
    CONSTRAINT FK_OrderItems_ProductVariants FOREIGN KEY (ProductVariantId) REFERENCES dbo.ProductVariants(Id)
);
GO

-- Reviews table
CREATE TABLE dbo.Reviews (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Rating INT NOT NULL,
    Comment NVARCHAR(2000) NULL,
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Reviews_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_Reviews_Rating CHECK (Rating BETWEEN 1 AND 5),
    CONSTRAINT UQ_Reviews_User_Product UNIQUE (UserId, ProductId),
    CONSTRAINT FK_Reviews_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Reviews_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
);
GO

-- WishlistItems table
CREATE TABLE dbo.WishlistItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_WishlistItems_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_WishlistItems_User_Product UNIQUE (UserId, ProductId),
    CONSTRAINT FK_WishlistItems_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_WishlistItems_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
);
GO

-- Addresses table
CREATE TABLE dbo.Addresses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    RecipientName NVARCHAR(200) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    AddressLine NVARCHAR(500) NOT NULL,
    City NVARCHAR(100) NULL,
    District NVARCHAR(100) NULL,
    Ward NVARCHAR(100) NULL,
    IsDefault BIT NOT NULL CONSTRAINT DF_Addresses_IsDefault DEFAULT 0,
    CONSTRAINT FK_Addresses_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO

-- Create indexes for performance
CREATE INDEX IX_Products_CategoryId ON dbo.Products(CategoryId);
CREATE INDEX IX_ProductImages_ProductId ON dbo.ProductImages(ProductId);
CREATE INDEX IX_ProductVariants_ProductId ON dbo.ProductVariants(ProductId);
CREATE INDEX IX_ProductVariants_ColorId ON dbo.ProductVariants(ColorId);
CREATE INDEX IX_ProductVariants_SizeId ON dbo.ProductVariants(SizeId);
CREATE INDEX IX_CartItems_CartId ON dbo.CartItems(CartId);
CREATE INDEX IX_CartItems_ProductVariantId ON dbo.CartItems(ProductVariantId);
CREATE INDEX IX_Orders_UserId ON dbo.Orders(UserId);
CREATE INDEX IX_OrderItems_OrderId ON dbo.OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON dbo.OrderItems(ProductId);
CREATE INDEX IX_Reviews_ProductId ON dbo.Reviews(ProductId);
CREATE INDEX IX_WishlistItems_ProductId ON dbo.WishlistItems(ProductId);
CREATE INDEX IX_Addresses_UserId ON dbo.Addresses(UserId);
GO

-- Seed basic data
INSERT INTO dbo.Categories (Name, Slug, Description, Status)
VALUES
    (N'Áo nam', N'ao-nam', N'Danh mục áo nam', N'active'),
    (N'Áo nữ', N'ao-nu', N'Danh mục áo nữ', N'active'),
    (N'Phụ kiện', N'phu-kien', N'Danh mục phụ kiện', N'active');
GO

INSERT INTO dbo.Colors (Name, HexCode)
VALUES
    (N'Đen', '#000000'),
    (N'Trắng', '#FFFFFF'),
    (N'Xanh', '#3B82F6'),
    (N'Đỏ', '#EF4444');
GO

INSERT INTO dbo.Sizes (Name)
VALUES (N'S'), (N'M'), (N'L'), (N'XL');
GO

-- PasswordHash below is a placeholder SHA256/Base64-style demo value, change it in production
INSERT INTO dbo.Users (FullName, Email, Phone, PasswordHash, Role, Status)
VALUES
    (N'Admin FashionStore', N'admin@fashionstore.vn', N'0900000000', N'8D969EEF6ECAD3C29A3A629280E686CDAA0A7A9F1BEA8A1F4E6E6B7965A7AB6D', N'admin', N'active');
GO

INSERT INTO dbo.Carts (UserId)
SELECT Id FROM dbo.Users WHERE Email = N'admin@fashionstore.vn';
GO
