#!/usr/bin/env node

/**
 * ============================================================
 * DATABASE MIGRATION SCRIPT: db-push.js
 * ============================================================
 * Runs all SQL migrations from supabase/migrations/ to Supabase
 * 
 * Usage:
 *   npm run db:push
 *   node scripts/db-push.js
 * 
 * Environment:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

// Load environment variables
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ─── VALIDATION ────────────────────────────────────────────
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Missing environment variables:");
  if (!SUPABASE_URL) console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  if (!SERVICE_ROLE_KEY) console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  console.error("\n📝 Please add these to .env.local");
  process.exit(1);
}

console.log("✅ Environment loaded");
console.log(`   Supabase: ${SUPABASE_URL}\n`);

// ─── EXECUTE SQL ───────────────────────────────────────────
async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL("/rest/v1/rpc/exec", SUPABASE_URL);
    const postData = JSON.stringify({ query: sql });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ─── MAIN ──────────────────────────────────────────────────
async function runMigrations() {
  const migrationsDir = path.join(__dirname, "../supabase/migrations");

  // Check directory exists
  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }

  // Get all SQL files
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("⚠️  No SQL migration files found");
    process.exit(0);
  }

  console.log(`📋 Found ${files.length} migration(s)\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    console.log(`⏳ Running: ${file}`);

    try {
      await executeSQL(sql);
      console.log(`✅ Success: ${file}\n`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed: ${file}`);
      console.error(`   ${err.message}\n`);
      failCount++;
    }
  }

  // Summary
  console.log("📊 Migration Summary:");
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
}

// Run
runMigrations().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
