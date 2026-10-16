# 🔧 Upload Logo - Fix & Debug Guide

## ✅ Các Fix Đã Thực Hiện

### 1. **Cải thiện Error Logging** 
- **File**: `src/lib/adminDbService.ts` (dòng 119-127)
  - ❌ Trước: `console.error("Error updating setting:", error)` (chỉ log object rỗng)
  - ✅ Sau: Log chi tiết `error.message || JSON.stringify(error)` + context (key, value, data)

- **File**: `app/api/admin/settings/route.ts` (dòng 19-24 & 53-63)
  - ❌ Trước: Chỉ log `error.message` (có thể rỗng)
  - ✅ Sau: Log chi tiết error + context parameters

### 2. **Logic Upload Logo ✅ ĐÚNG RỒI**
- **File**: `src/components/admin/SiteSettingsManager.tsx` (dòng 58-75)
  - ✅ Dòng 64: `const url = await uploadImage(file)` → Upload lên Supabase Storage
  - ✅ Dòng 67: `await updateSetting("logo", url, { url })` → Lưu URL (không Base64)
  - ✅ Logic này **không có vấn đề!**

---

## 🐛 Debug Steps

### Step 1: Kiểm tra bảng settings
- Xác nhận bảng `settings` và quyền truy cập trong Supabase.
- Không gọi endpoint debug cũ: endpoint đó đã được gỡ vì thao tác thử có thể ghi đè setting logo.

### Step 2: Phân tích Error Message
Bây giờ error log sẽ chi tiết, kiểm tra:
- `error.message`: Error text cụ thể
- `key/value/data`: Xem dữ liệu được gửi lên
- `fullError`: Object error đầy đủ

---

## 🚀 Test Upload Logo

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Truy cập Admin Dashboard**
   - http://localhost:3000/admin
   - Tab "Cài đặt trang web"

3. **Upload Logo**
   - Click "Upload Logo"
   - Chọn file ảnh
   - Xem message success/error

4. **Kiểm tra Console**
   - Browser DevTools → Console
   - Server Console → Terminal
   - Tìm error message chi tiết

---

## 📋 Possible Issues & Solutions

### Issue 1: RLS Policy chặn upsert
- **Error**: `{code: "PGRST..."}` hoặc `Failed to update setting`
- **Fix**: Check Supabase RLS Policy cho bảng `settings`
  - Cần allow `SELECT, INSERT, UPDATE` cho `service_role` (đã bypass RLS)
  - Hoặc disable RLS hoàn toàn cho dev

### Issue 2: Schema bảng `settings` không match
- **Error**: `column "data" does not exist` hoặc tương tự
- **Fix**: Verify bảng `settings` có các cột:
  - `id` (UUID primary key)
  - `key` (TEXT unique)
  - `value` (TEXT)
  - `data` (JSONB)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

### Issue 3: Image Upload thất bại (trước khi update setting)
- **Error**: "Lỗi upload logo" từ client
- **Check**: 
  - Supabase Storage bucket `uploads` tồn tại?
  - RLS policy cho bucket cho phép upload?
  - File size có quá lớn không?

---

## 🔗 Next Steps

1. ✅ Chạy debug script để xem error chi tiết
2. ✅ Share error message nếu vẫn fail
3. ✅ Sẽ fix dựa trên error message cụ thể

---

**Modified Files:**
- ✅ `src/lib/adminDbService.ts` - Chi tiết error logging
- ✅ `app/api/admin/settings/route.ts` - Chi tiết error logging
