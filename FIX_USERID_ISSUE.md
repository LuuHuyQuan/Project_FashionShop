# Hướng dẫn Fix vấn đề UserId = 1

## Vấn đề
Tất cả đơn hàng đều có `userId = 1` thay vì userId của người dùng đang đăng nhập.

## Nguyên nhân có thể
1. **Dữ liệu cũ trong localStorage** - User data được lưu từ lần đăng nhập cũ
2. **Token không chứa đúng userId** - Backend JWT không encode đúng userId
3. **Frontend không đọc đúng userId từ context**

## Các bước kiểm tra

### Bước 1: Kiểm tra Auth Context
1. Mở trình duyệt và truy cập: `http://localhost:5173/debug-auth`
2. Kiểm tra thông tin hiển thị:
   - **User ID** phải khác 1 (nếu bạn đăng nhập bằng user khác)
   - **Is Authenticated** phải là "Yes"
   - **Has Token** phải là "Yes"

### Bước 2: Nếu User ID vẫn là 1
Có 2 cách fix:

#### Cách 1: Xóa localStorage và đăng nhập lại
1. Trên trang `/debug-auth`, click nút **"Clear Auth & Reload"**
2. Đăng nhập lại bằng tài khoản khác (không phải admin)
3. Kiểm tra lại trang `/debug-auth`
4. Thử đặt hàng

#### Cách 2: Xóa thủ công
1. Mở DevTools (F12)
2. Vào tab **Application** > **Local Storage**
3. Tìm key `fashionstore_auth` và xóa
4. Reload trang
5. Đăng nhập lại
6. Thử đặt hàng

### Bước 3: Kiểm tra Console khi Checkout
1. Mở DevTools (F12) > Tab **Console**
2. Thêm sản phẩm vào giỏ hàng
3. Đi đến trang Checkout
4. Điền form và click "Đặt hàng"
5. Xem log trong Console:
   ```
   === CHECKOUT REQUEST ===
   User from context: { id: X, fullName: "...", ... }
   User ID: X
   Request: { userId: X, ... }
   ```
6. **Kiểm tra**: `User ID` và `userId` trong request phải GIỐNG NHAU và KHÔNG PHẢI 1

### Bước 4: Kiểm tra Backend JWT
Nếu sau khi xóa localStorage và đăng nhập lại vẫn bị userId = 1, vấn đề ở backend:

1. Mở file: `Services.Auth.Infrastructure\Authentication\JwtTokenGenerator.cs`
2. Kiểm tra dòng tạo claim cho UserId:
   ```csharp
   new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
   ```
3. Đảm bảo `user.Id` là ID thật của user đang đăng nhập

## Kiểm tra kết quả
1. Đăng nhập bằng user khác (ví dụ: luuhuyquan, test)
2. Đặt hàng
3. Vào database kiểm tra bảng `Orders`
4. Cột `UserId` phải là ID của user vừa đăng nhập, KHÔNG PHẢI 1

## Nếu vẫn không được
Gửi cho tôi:
1. Screenshot trang `/debug-auth` sau khi đăng nhập
2. Screenshot Console log khi checkout
3. Screenshot bảng Orders trong database
