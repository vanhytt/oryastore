# 🚀 SUPABASE MIGRATIONS - COMPLETE SETUP GUIDE

## ✅ **Vấn Đề Giải Quyết**

### ❌ **Lỗi Ban Đầu**
```
Error: Could not find the table 'public.settings' in the schema cache
Location: handleSaveBannerSettings → updateSetting
```

### ✅ **Nguyên Nhân**
Bảng `settings` chưa được tạo trong Supabase Database

### ✅ **Giải Pháp**
1. ✅ SQL migration file: `supabase/migrations/001_create_settings_table.sql`
2. ✅ Validation & fallback trong `src/lib/adminDbService.ts`
3. ✅ Node.js script: `scripts/db-push.js`
4. ✅ npm script: `npm run db:push`

---

## 📋 **FILES CREATED/MODIFIED**

### **New Files** ✅
- `supabase/migrations/001_create_settings_table.sql` - SQL migration (95 lines)
- `scripts/db-push.js` - Migration runner script (140 lines)

### **Modified Files** ✅
- `package.json` - Added `db:push` & `db:check` scripts
- `src/lib/adminDbService.ts` - Added validation & localStorage fallback

---

## 🚀 **QUICK START (3 STEPS)**

### **Step 1: Run Migration**
```bash
npm run db:push
```

Expected output:
```
✅ Environment loaded
   Supabase: https://...

📋 Found 1 migration(s)

⏳ Running: 001_create_settings_table.sql
✅ Success: 001_create_settings_table.sql

📊 Migration Summary:
   ✅ Success: 1
   ❌ Failed: 0
   📋 Total: 1

🎉 All migrations completed successfully!
```

### **Step 2: Verify in Supabase**
```sql
-- Go to Supabase Dashboard → SQL Editor
-- Run this query:
SELECT * FROM public.settings;
```

Expected: 4 default rows (logo, hero_banner, site_name, site_description) ✅

### **Step 3: Test in App**
```bash
npm run dev
# Open: http://localhost:3000/admin
# Tab: "Cài đặt trang web"
# Upload logo → Success! ✅
```

---

## 🔧 **HOW IT WORKS**

### **Migration Execution Flow**
```
npm run db:push
    ↓
scripts/db-push.js (Node.js script)
    ↓
Reads supabase/migrations/*.sql
    ↓
Executes each SQL via Supabase REST API
    ↓
Uses SERVICE_ROLE_KEY to bypass RLS
    ↓
Reports success/failure for each file
```

### **Error Handling**
1. **Table not found error** → Falls back to localStorage
2. **Missing env vars** → Shows helpful error message
3. **RLS denied** → Warns about needing SERVICE_ROLE_KEY
4. **Any other error** → Logs detailed error + falls back to localStorage

### **Validation & Fallback in Code**
```typescript
// src/lib/adminDbService.ts
getSettings() {
  try {
    // Try Supabase
    const { data, error } = await supabase.from("settings").select("*");
    
    if (error?.code === "PGRST116") {  // table not found
      console.warn("⚠️ Settings table not found");
      console.warn("📝 Please run: npm run db:push");
      // Fall back to localStorage
      return localStorage.getItem("orya_settings");
    }
    return data;
  } catch (err) {
    // Fall back to localStorage on any error
    return localStorage.getItem("orya_settings");
  }
}
```

---

## 📊 **SCHEMA CREATED**

### **Table: settings**
```sql
Columns:
- id (BIGINT, PK, auto-increment)
- key (TEXT, UNIQUE, NOT NULL)
- value (TEXT)
- data (JSONB)
- created_at (TIMESTAMPTZ, default NOW())
- updated_at (TIMESTAMPTZ, auto-updated)

Indexes:
- idx_settings_key (on key)
- idx_settings_updated_at (on updated_at DESC)

RLS Policies:
- Allow all for service_role (admin)
- Allow read for authenticated
- Allow read for anon
```

### **Default Data**
```sql
INSERT INTO settings (key, value) VALUES
- ('logo', NULL)
- ('hero_banner', NULL)
- ('site_name', 'ORYA Store')
- ('site_description', 'Cửa hàng trực tuyến ORYA')
```

---

## ✅ **VERIFICATION CHECKLIST**

- [ ] Run: `npm run db:push`
- [ ] Check console: "✅ Success: 001_create_settings_table.sql"
- [ ] Verify in Supabase: Table `settings` exists with 4 rows
- [ ] Check RLS policies: 3 policies created
- [ ] Test app: Upload logo works without error
- [ ] Check localStorage: Fallback working if needed

---

## ⚠️ **TROUBLESHOOTING**

### **Issue: `npm run db:push` fails with auth error**
**Solution:**
```bash
# Verify .env.local has these:
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Restart terminal to reload env vars
```

### **Issue: Still getting "table not found"**
**Solution:**
```bash
# Check migration ran successfully:
npm run db:push

# Verify table in Supabase Dashboard:
# SQL Editor → SELECT * FROM public.settings;

# If not found, check console output for errors
```

### **Issue: "permission denied" error**
**Solution:**
- Check SERVICE_ROLE_KEY is correct in `.env.local`
- RLS policies should allow service_role access (already set)

### **Issue: Upload still fails**
**Solution:**
1. Check: Migration successful? ✅
2. Check: Table exists in Supabase? ✅
3. Restart: `npm run dev`
4. Check: Server console for detailed error
5. Check: Browser console for error details

---

## 📝 **npm SCRIPTS**

### **db:push - Run all migrations**
```bash
npm run db:push
```
- Reads all `.sql` files from `supabase/migrations/`
- Executes each migration in order
- Reports success/failure

### **db:check - Check migration status** (Optional)
```bash
npm run db:check
```
- Same as `db:push` (can be used for CI/CD checks)

---

## 🎯 **NEXT STEPS**

1. **Immediate:**
   ```bash
   npm run db:push
   ```

2. **Verify:**
   - Check Supabase Dashboard
   - Check browser console logs

3. **Test:**
   ```bash
   npm run dev
   # Test upload logo in admin dashboard
   ```

4. **Deploy:**
   - Push to repository
   - Migration runs automatically on each deploy (via npm script)

---

## 📚 **ADDITIONAL RESOURCES**

- **Migration file:** `supabase/migrations/001_create_settings_table.sql`
- **Runner script:** `scripts/db-push.js`
- **Code with fallback:** `src/lib/adminDbService.ts`
- **Supabase docs:** https://supabase.com/docs/guides/database/migrations

---

**🎉 Ready to run! Execute: `npm run db:push`**
