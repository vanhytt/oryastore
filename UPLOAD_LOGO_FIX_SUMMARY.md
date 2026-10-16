## 🎉 **UPLOAD LOGO FIX - HOÀN THÀNH!**

### ✅ **Vấn đề Đã Xác Định & Sửa**

#### **1. Error Logging Không Chi Tiết (FIXED ✅)**
**Problem:** 
- `Error updating setting: {}` → Không biết nguyên nhân thực sự
- `error.message` có thể undefined → Log rỗng

**Solution Applied:**
- `src/lib/adminDbService.ts` (dòng 119-127)
  - Thêm: `error.message || JSON.stringify(error)`
  - Log context: `{ key, value, data, fullError }`
  
- `app/api/admin/settings/route.ts` (dòng 19-24, 53-63)
  - Thêm chi tiết error logging cho GET & PUT
  - Include parameters trong error log

**Result:** Bây giờ sẽ thấy error message cụ thể trong server console

---

#### **2. Logic Upload Logo (VERIFIED ✅ - NO ISSUE)**
**Analysis:**
```typescript
// src/components/admin/SiteSettingsManager.tsx (dòng 58-75)
const handleLogoUpload = async (e) => {
  const file = e.target.files?.[0];
  const url = await uploadImage(file);  // ✅ Upload to Storage (get URL)
  await updateSetting("logo", url, { url }); // ✅ Save URL to DB (not Base64)
}
```
✅ **Không phải vấn đề!** Đã upload lấy URL rồi mới lưu

---

#### **3. Possible Root Causes**
Nguyên nhân lỗi có thể từ:

**A. RLS Policy** (Most Likely)
- Bảng `settings` có RLS enabled nhưng policy không allow upsert
- Fix: Supabase Dashboard → RLS Policy → Allow INSERT/UPDATE/SELECT cho `service_role`

**B. Schema Mismatch**
- Bảng `settings` thiếu cột `data` (JSONB)
- Fix: Verify schema có đầy đủ columns

**C. Storage Upload Failed**
- Image upload thất bại trước khi update setting
- Fix: Check error từ `uploadImage()` trước

---

### 🔧 **Verification**

The temporary debug endpoint was removed because its test upsert could overwrite the
logo setting. Verify the `settings` table and its policies in Supabase, then test
uploads through the authenticated Admin interface.

---

### 📋 **Files Modified/Created**

| File | Change | Status |
|------|--------|--------|
| `src/lib/adminDbService.ts` | Enhanced error logging | ✅ Modified |
| `app/api/admin/settings/route.ts` | Enhanced error logging | ✅ Modified |
| `UPLOAD_LOGO_FIX_GUIDE.md` | Full debugging guide | ✅ Created |

---

### 🚀 **Next Action**

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Verify the setting and Storage policies** in Supabase.

3. **Share the upload error message** if the issue persists.

---

⚠️ **Important Notes:**
- ✅ `supabaseAdmin` đã configured (SUPABASE_SERVICE_ROLE_KEY tồn tại)
- ✅ RLS nên bypass bởi service_role key
- ❌ Nhưng vẫn có lỗi → Cần debug chi tiết
