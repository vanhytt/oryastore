# ⚡ QUICK START - Chạy Migrations Ngay

## 🎯 **Vấn đề**
```
Error: Could not find the table 'public.settings'
```

## ✅ **Giải Pháp (5 Phút)**

### **Step 1: Mở Supabase Dashboard**
```
https://app.supabase.com
Project: ebdezrgnuscemdojpyga
Tab: SQL Editor
```

### **Step 2: Chạy 3 SQL Files (theo thứ tự)**

#### File 1: Settings Table
- Mở: `supabase/migrations/20261014_create_settings_table.sql`
- Copy → Paste vào SQL Editor
- Click "Run" → ✅ Success

#### File 2: Certificates Table
- Mở: `supabase/migrations/20261014_create_certificates_table.sql`
- Copy → Paste vào SQL Editor
- Click "Run" → ✅ Success

#### File 3: Footer Settings Table
- Mở: `supabase/migrations/20261014_create_footer_settings_table.sql`
- Copy → Paste vào SQL Editor
- Click "Run" → ✅ Success

### **Step 3: Verify Tables**
- Tab: **Table Editor**
- Check có 3 bảng: `settings`, `certificates`, `footer_settings` ✅

### **Step 4: Test App**
```bash
npm run dev
# Mở: http://localhost:3000/admin
# Tab: Cài đặt trang web
# Upload logo → ✅ Success!
```

---

## 📋 **Files Created**

**Migrations:**
- ✅ `supabase/migrations/20261014_create_settings_table.sql`
- ✅ `supabase/migrations/20261014_create_certificates_table.sql`
- ✅ `supabase/migrations/20261014_create_footer_settings_table.sql`

**Scripts (Optional):**
- ✅ `scripts/run-migrations.js`
- ✅ `scripts/run-migrations-simple.js`

**Code Fixes:**
- ✅ `src/lib/adminDbService.ts` - Added `onConflict: "key"`

---

## 🆘 **Nếu Vẫn Lỗi**

### Check 1: Migrations chạy xong chưa?
```sql
-- SQL Editor → Run này
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('settings', 'certificates', 'footer_settings');
```
Expected: 3 rows ✅

### Check 2: Environment variables
```
.env.local:
- NEXT_PUBLIC_SUPABASE_URL ✅
- SUPABASE_SERVICE_ROLE_KEY ✅
```

### Check 3: Console error message
- Browser DevTools → Console
- Server Console → Check error chi tiết

---

**Done! 🎉**
