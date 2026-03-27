# FashionStore E-Commerce Website

> Website bán hàng thời trang full-stack (React + TypeScript + .NET + SQL Server)

---

## 📌 Giới thiệu

FashionStore là một hệ thống thương mại điện tử đặt trọng tâm vào trải nghiệm người dùng, quản lý sản phẩm, đơn hàng, quyền hạn và hỗ trợ quy trình bán hàng tổng thể.

Mục tiêu:
- Xây dựng website bán hàng hiện đại, responsive
- Tối ưu trải nghiệm mua hàng, giỏ hàng và thanh toán
- Phân quyền rõ ràng: Admin, Staff, Customer
- Dễ mở rộng và bảo trì



## 👥 Vai trò người dùng

### 1. Khách hàng (Customer)
- Xem danh sách sản phẩm, tìm kiếm, lọc
- Thêm sản phẩm vào giỏ hàng
- Thanh toán & xem đơn hàng của bản thân
- Đánh giá và nhận xét sản phẩm

### 2. Nhân viên (Staff)
- Xử lý đơn hàng, cập nhật trạng thái
- Theo dõi thông tin giao hàng
- Hỗ trợ khách hàng khi cần

### 3. Quản trị viên (Admin)
- Quản lý người dùng, sản phẩm, danh mục
- Phân quyền nhân viên
- Quản lý đơn hàng và thống kê bán hàng

---

## 🧩 Nghiệp vụ chính

### Quản lý người dùng
- Thu thập: Họ tên, email, số điện thoại
- Quyền: `admin`, `staff`, `customer`, `vip`
- Trạng thái: `active`, `inactive`, `banned`
- Tính năng: 1 user có 1 giỏ hàng, nhiều đơn hàng, đánh giá sản phẩm

### Quản lý danh mục (Categories)
- Phân loại sản phẩm, dùng slug SEO
- 1 danh mục nhiều sản phẩm

### Quản lý sản phẩm (Products)
- Thuộc tính: tên, mô tả, giá (giá gốc + giá bán), tồn kho, trạng thái, nhãn (Sale/New/Hot)
- Quan hệ: 1 sản phẩm thuộc 1 danh mục, nhiều ảnh, màu sắc, size

### Hình ảnh sản phẩm
- Nhiều ảnh/sản phẩm
- Ảnh đại diện (thumbnail)

### Thuộc tính sản phẩm
- Color: tên, mã HEX
- Size: XS/S/M/L/XL

### Đánh giá sản phẩm (Reviews)
- User đánh giá 1–5 sao + bình luận
- Liên kết với user và product

### Giỏ hàng (Cart)
- 1 user = 1 giỏ hàng
- Cart item: product + color + size + qty

### Đơn hàng (Orders)
- Thông tin: mã đơn, người đặt, địa chỉ, tổng tiền
- Trạng thái: `pending`, `processing`, `shipping`, `completed`, `cancelled`
- Thanh toán: `COD`, `VNPay`, `MoMo`

### Chi tiết đơn hàng (Order Items)
- Snapshot: tên sản phẩm, giá, màu, size, số lượng

---

## 🚀 Tính năng chính
- Đăng ký / đăng nhập
- Browsing / tìm kiếm / lọc sản phẩm
- Giỏ hàng + checkout
- Quản lý sản phẩm, danh mục
- Quản lý đơn hàng
- Phân quyền Admin / Staff / Customer
- Đánh giá sản phẩm

---

## 🛠 Công nghệ sử dụng
- Frontend: React.js + TypeScript + Vite
- Backend: C# .NET (ASP.NET Core)
- Database: SQL Server
- UI: CSS / component-based design

---

## 🚀 Chạy dự án
1. `cd Project_FashionStore`
2. `npm install`
3. `npm run dev`

> Backend: cấu hình API và DB bên project `be/` (nếu có).

---

## 📁 Cấu trúc thư mục chính (frontend)
- `src/components`: UI components và layout
- `src/pages`: các trang Home, Products, Cart, Admin
- `src/routes`: AppRoutes
- `src/assets`: hình ảnh, css, scripts
- `src/lib`: helpers và utils

---

## 📌 Ghi chú
- Đảm bảo cấu hình kết nối DB trong `appsettings.json` cho backend
- Tạo migration & seed data nếu cần

