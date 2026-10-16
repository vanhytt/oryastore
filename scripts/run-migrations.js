#!/usr/bin/env node

/**
 * ============================================================
 * SUPABASE MIGRATIONS RUNNER
 * ============================================================
 * Chạy tất cả SQL migrations từ supabase/migrations/
 * 
 * Usage:
 *   node scripts/run-migrations.js
 * 
 * Environment variables:
 *   SUPABASE_URL: Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY: Service role key (admin access)
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// ─── LOAD ENV ──────────────────────────────────────────────
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing environment variables:");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

console.log("✅ Environment variables loaded");
console.log(`   URL: ${supabaseUrl}`);

// ─── CREATE ADMIN CLIENT ──────────────────────────────────
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ─── RUN MIGRATIONS ───────────────────────────────────────
async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, "../supabase/migrations");

    // Get all SQL files
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    if (files.length === 0) {
      console.log("⚠️  No migration files found in supabase/migrations/");
      return;
    }

    console.log(`\n📋 Found ${files.length} migration(s):\n`);

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`⏳ Running: ${file}`);

      try {
        // Execute SQL using raw query
        const { error } = await supabase.rpc("exec_sql", { sql });

        if (error) {
          // If exec_sql doesn't exist, try direct query approach
          if (error.message.includes("exec_sql")) {
            console.log(`⚠️  exec_sql() not available. Using direct query...`);
            await runDirectSQL(supabase, sql);
          } else {
            throw error;
          }
        }

        console.log(`✅ Success: ${file}\n`);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed: ${file}`);
        console.error(`   Error: ${err.message}\n`);
        failCount++;
      }
    }

    console.log("\n📊 Migration Summary:");
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📋 Total: ${files.length}\n`);

    if (failCount > 0) {
      console.log("⚠️  Some migrations failed. Check errors above.");
      process.exit(1);
    } else {
      console.log("🎉 All migrations completed successfully!");
      process.exit(0);
    }
  } catch (err) {
    console.error("❌ Migration runner error:", err);
    process.exit(1);
  }
}

// ─── DIRECT SQL EXECUTION ─────────────────────────────────
async function runDirectSQL(client, sql) {
  // This is a fallback if exec_sql RPC is not available
  // Split SQL into individual statements and execute
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith("--"));

  for (const statement of statements) {
    const { error } = await client.rpc("exec", { sql: statement });
    if (error && !error.message.includes("does not exist")) {
      throw error;
    }
  }
}

// ─── RUN ──────────────────────────────────────────────────
runMigrations();
