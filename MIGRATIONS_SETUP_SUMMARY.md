# ✅ SUPABASE TABLES SETUP - HOÀN THÀNH!

## 🎯 **Vấn Đề Đã Giải Quyết**

### ❌ **Lỗi Ban Đầu**
```
Error: Could not find the table 'public.settings' in the schema cache
```

### ✅ **Nguyên Nhân**
- Bảng `settings`, `certificates`, `footer_settings` chưa được tạo trong Supabase Database

### ✅ **Giải Pháp Đã Áp Dụng**
1. ✅ Tạo SQL migrations cho 3 bảng
2. ✅ Tạo Node.js scripts để chạy migrations
3. ✅ Tối ưu code với `onConflict` để tránh lỗi duplicate

---

## 📋 **Files Đã Tạo/Sửa**

### **SQL Migrations** (supabase/migrations/)
| File | Description | Lines |
|------|-------------|-------|
| `20261014_create_settings_table.sql` | Tạo bảng settings + RLS | 68 |
| `20261014_create_certificates_table.sql` | Tạo bảng certificates + RLS | 53 |
| `20261014_create_footer_settings_table.sql` | Tạo bảng footer_settings + RLS | 62 |

### **Node.js Scripts** (scripts/)
| File | Description | Lines |
|------|-------------|-------|
| `run-migrations.js` | Advanced migration runner | 145 |
| `run-migrations-simple.js` | Simple migration runner | 98 |

### **Documentation**
| File | Description |
|------|-------------|
| `MIGRATIONS_RUN_GUIDE.md` | Hướng dẫn chạy migrations |
| `MIGRATIONS_SETUP_SUMMARY.md` | Summary này |

### **Code Optimizations**
| File | Changes |
|------|---------|
| `src/lib/adminDbService.ts` | ✅ Line 115: Added `onConflict: "key"` for settings upsert |
| `src/lib/adminDbService.ts` | ✅ Line 321: Added `onConflict: "key"` for footer_settings upsert |

---

## 🚀 **NEXT STEPS - Chạy Migrations**

### **Option 1: Supabase Web Dashboard (DỄ NHẤT - RECOMMENDED)**

1. **Truy cập Supabase Dashboard:**
   - URL: https://app.supabase.com
   - Project: `ebdezrgnuscemdojpyga`
   - Tab: **SQL Editor**

2. **Chạy từng migration file:**

   **Step 1: Copy nội dung file này:**
   ```
   supabase/migrations/20261014_create_settings_table.sql
   ```
   - Paste vào SQL Editor
   - Click "Run" hoặc Cmd+Enter
   - Đợi success message ✅

   **Step 2: Repeat cho file:**
   ```
   supabase/migrations/20261014_create_certificates_table.sql
   ```

   **Step 3: Repeat cho file:**
   ```
   supabase/migrations/20261014_create_footer_settings_table.sql
   ```

3. **Verify tables đã tạo:**
   - Tab: **Table Editor**
   - Check 3 bảng:
     - ✅ `settings`
     - ✅ `certificates`
     - ✅ `footer_settings`

---

### **Option 2: Supabase CLI**

```bash
# Install CLI (nếu chưa có)
npm install -g supabase

# Link project
supabase link --project-ref ebdezrgnuscemdojpyga

# Push migrations
supabase db push
```

---

### **Option 3: Node.js Script**

```bash
# Run migration script
node scripts/run-migrations-simple.js
```

---

## ✅ **Verify Migrations Thành Công**

### **1. Check in Supabase SQL Editor:**
```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('settings', 'certificates', 'footer_settings')
ORDER BY tablename;
```

Expected result: 3 rows

### **2. Check in App:**
The temporary debug endpoint was removed because its test upsert could overwrite the
logo setting. Verify the `settings` table with the SQL query above and test uploads
through the authenticated Admin interface.

### **3. Test Upload Logo:**
- Go to: http://localhost:3000/admin
- Tab: "Cài đặt trang web"
- Click "Upload Logo"
- Upload một file ảnh
- Expected: ✅ "Cập nhật logo thành công!"

---

## 🎉 **Expected Results After Migrations**

1. ✅ Bảng `settings` tồn tại với RLS policies
2. ✅ Bảng `certificates` tồn tại với RLS policies
3. ✅ Bảng `footer_settings` tồn tại với RLS policies
4. ✅ Upload logo hoạt động không lỗi
5. ✅ Error message chi tiết (nếu có lỗi khác)

---

## 📊 **Schema Details**

### **Table: settings**
```sql
- id: BIGINT (primary key, auto-increment)
- key: TEXT (unique, not null)
- value: TEXT
- data: JSONB
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### **Table: certificates**
```sql
- id: BIGINT (primary key, auto-increment)
- name: TEXT (not null)
- description: TEXT
- image_url: TEXT
- sort_order: INT (default 0)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### **Table: footer_settings**
```sql
- id: BIGINT (primary key, auto-increment)
- key: TEXT (unique, not null)
- value: TEXT
- label: TEXT
- data: JSONB
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

---

## 🔒 **RLS Policies Created**

All tables có 3 RLS policies:
1. ✅ **Allow all for service_role** - Full access cho admin API
2. ✅ **Allow read for authenticated** - Authenticated users có thể đọc
3. ✅ **Allow read for anon** - Anonymous users có thể đọc public settings

---

## ⚠️ **Troubleshooting**

### Issue: "table already exists"
- ✅ OK! SQL dùng `CREATE TABLE IF NOT EXISTS`
- Có thể run lại bất cứ lúc nào

### Issue: Still getting "table not found"
- ❌ Migrations chưa chạy
- Fix: Run migrations theo Option 1, 2, hoặc 3

### Issue: "permission denied"
- ❌ RLS policy issue
- Fix: Verify `SUPABASE_SERVICE_ROLE_KEY` trong `.env.local`

---

## 📝 **Summary**

- ✅ 3 SQL migration files created
- ✅ 2 Node.js migration runner scripts created
- ✅ Code optimized with `onConflict: "key"` for upsert
- ✅ Full documentation provided
- 🚀 **READY TO RUN MIGRATIONS!**

**Next action:** Chọn Option 1, 2, hoặc 3 để chạy migrations → Test upload logo!
