# 🚀 Chạy Supabase Migrations - Hướng Dẫn

## ✅ **Cách 1: Sử Dụng Supabase Web Dashboard (DỄ NHẤT)**

### Step 1: Mở Supabase Dashboard
- Truy cập: https://app.supabase.com
- Chọn Project: `ebdezrgnuscemdojpyga`
- Tab: **SQL Editor**

### Step 2: Copy & Paste SQL từng file

**File 1: `supabase/migrations/20261014_create_settings_table.sql`**
- Mở file này trong editor
- Copy toàn bộ nội dung
- Paste vào Supabase SQL Editor
- Click "Run" (hoặc Cmd+Enter)
- Wait for success ✅

**File 2: `supabase/migrations/20261014_create_certificates_table.sql`**
- Repeat process

**File 3: `supabase/migrations/20261014_create_footer_settings_table.sql`**
- Repeat process

### Step 3: Verify Tables Created
- Go to: **Table Editor**
- Confirm bạn thấy 3 bảng mới:
  - ✅ `settings`
  - ✅ `certificates`
  - ✅ `footer_settings`

---

## 🔧 **Cách 2: Sử Dụng Supabase CLI (RECOMMENDED)**

### Prerequisites
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref ebdezrgnuscemdojpyga
```

### Run Migrations
```bash
# Push migrations to Supabase
supabase db push

# Or pull latest schema
supabase db pull
```

---

## 💻 **Cách 3: Sử Dụng Node.js Script (PROGRAMMATIC)**

### Run Script
```bash
# Method A: Direct execution (requires dotenv)
node scripts/run-migrations-simple.js

# Method B: Using npm script (add to package.json first)
npm run migrate
```

### Add to package.json
```json
{
  "scripts": {
    "migrate": "node scripts/run-migrations-simple.js",
    "migrate:check": "node scripts/run-migrations.js"
  }
}
```

---

## ✅ **Verify Migrations Success**

### Check in Supabase Web UI
```sql
-- Run this SQL in Supabase SQL Editor
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

The temporary debug endpoint has been removed because its test upsert could overwrite
the production logo setting. Verify the `settings` table with the SQL query above and
test uploads through the authenticated Admin interface.

---

## 🎯 **RECOMMENDED: Cách 1 (Manual via Web UI)**

**Lý do:**
- ✅ Không cần cài thêm package
- ✅ Instant visual feedback
- ✅ Có thể debug từng step
- ✅ Phù hợp với DEV environment

---

## ⚠️ **Troubleshooting**

### Issue: "table already exists"
- OK! Migrations dùng `CREATE TABLE IF NOT EXISTS`
- Có thể run lại bất cứ lúc nào

### Issue: "permission denied"
- Check: RLS Policy cho service_role role
- Verify: SERVICE_ROLE_KEY trong `.env.local` đúng

### Issue: "could not find the table"
- Confirm: Run migrations xong chưa?
- Check: Table editor thấy bảng chưa?

---

## 📋 **Files Created**

- ✅ `supabase/migrations/20261014_create_settings_table.sql`
- ✅ `supabase/migrations/20261014_create_certificates_table.sql`
- ✅ `supabase/migrations/20261014_create_footer_settings_table.sql`
- ✅ `scripts/run-migrations.js` (advanced)
- ✅ `scripts/run-migrations-simple.js` (simple)
