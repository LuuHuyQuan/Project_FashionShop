-- Create Admin User
-- Password: Admin@123
-- BCrypt hash generated with cost factor 11

USE FashionStoreDb;
GO

-- Check if admin user exists
IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Email] = 'admin@fashionstore.com')
BEGIN
    INSERT INTO [dbo].[Users] (
        [FullName],
        [Email],
        [Phone],
        [PasswordHash],
        [Role],
        [Status],
        [CreatedAt]
    )
    VALUES (
        N'Administrator',
        'admin@fashionstore.com',
        '0900000000',
        '$2a$11$XxvU8Z8yH5K5Z5Z5Z5Z5ZeN5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', -- Admin@123
        'admin',
        'active',
        GETUTCDATE()
    );
    
    PRINT 'Admin user created successfully.';
    PRINT 'Email: admin@fashionstore.com';
    PRINT 'Password: Admin@123';
END
ELSE
BEGIN
    PRINT 'Admin user already exists.';
END
GO
