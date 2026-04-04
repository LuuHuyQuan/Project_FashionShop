# Test ProductsPage

## Các bước kiểm tra:

### 1. Kiểm tra dev server đang chạy
```bash
cd Project_FashionStore
npm run dev
```

### 2. Mở trình duyệt
- Vào: http://localhost:5173/products
- Kiểm tra Console (F12) xem có lỗi gì không

### 3. Các lỗi có thể gặp:

#### Lỗi: Trang trắng
**Nguyên nhân:** 
- Import sai từ products.ts
- Data không load được

**Cách sửa:**
- Kiểm tra file `src/data/products.ts` có tồn tại không
- Kiểm tra export đúng: `export const products = [...]`
- Kiểm tra import trong ProductsPage: `import { products as allProducts } from '../data/products'`

#### Lỗi: Module not found
**Nguyên nhân:**
- File products.js vẫn còn cache
- TypeScript chưa compile

**Cách sửa:**
```bash
# Xóa cache
rm -rf node_modules/.vite
rm -rf dist

# Restart dev server
npm run dev
```

### 4. Kiểm tra data
Mở Console và gõ:
```javascript
// Kiểm tra products có load không
console.log(window.location.pathname)
```

### 5. Nếu vẫn lỗi
- Kiểm tra Network tab xem có request nào fail không
- Kiểm tra Console có error message gì
- Chụp màn hình gửi cho dev team

## Data hiện có:
- 12 sản phẩm trong products.ts
- Tất cả có ảnh thật từ Unsplash
- Categories tự động generate từ products

## Expected behavior:
- Trang hiển thị 12 sản phẩm
- Filter sidebar bên trái
- Grid view mặc định
- Có thể search, filter, sort
