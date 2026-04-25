-- Add Image column to Categories table
USE FashionStoreDb;
GO

-- Check if column exists before adding
IF NOT EXISTS (
    SELECT * FROM sys.columns 
    WHERE object_id = OBJECT_ID(N'[dbo].[Categories]') 
    AND name = 'Image'
)
BEGIN
    ALTER TABLE [dbo].[Categories]
    ADD [Image] NVARCHAR(500) NULL;
    
    PRINT 'Column Image added to Categories table successfully.';
END
ELSE
BEGIN
    PRINT 'Column Image already exists in Categories table.';
END
GO

-- Update existing categories with sample images (optional)
UPDATE [dbo].[Categories]
SET [Image] = CASE 
    WHEN [Name] LIKE N'%Áo%' THEN 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400'
    WHEN [Name] LIKE N'%Quần%' THEN 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400'
    WHEN [Name] LIKE N'%Váy%' THEN 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
    WHEN [Name] LIKE N'%Giày%' THEN 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
    WHEN [Name] LIKE N'%Túi%' THEN 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
    WHEN [Name] LIKE N'%Phụ kiện%' THEN 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400'
    ELSE 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
END
WHERE [Image] IS NULL;
GO

PRINT 'Categories table updated successfully.';
GO
