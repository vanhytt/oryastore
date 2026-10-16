#!/usr/bin/env node

/**
 * ============================================================
 * SIMPLE SUPABASE MIGRATIONS RUNNER
 * ============================================================
 * Chạy SQL migrations trực tiếp vào Supabase Database
 * Sử dụng Supabase Management API
 * 
 * Usage: node scripts/run-migrations-simple.js
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Load env
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Missing env variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

console.log("✅ Loaded environment variables");
console.log(`   Supabase URL: ${SUPABASE_URL}\n`);

// Execute SQL via REST API
async function executeSQL(sql) {
  const url = new URL("/rest/v1/rpc/exec", SUPABASE_URL);
  
  return new Promise((resolve, reject) => {
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

// Main
async function main() {
  const migrationsDir = path.join(__dirname, "../supabase/migrations");
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("⚠️  No SQL files found in supabase/migrations/");
    return;
  }

  console.log(`📋 Found ${files.length} migration(s)\n`);

  for (const file of files) {
    console.log(`⏳ Running: ${file}`);
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    try {
      await executeSQL(sql);
      console.log(`✅ Success: ${file}\n`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`);
      console.error(`   ${err.message}\n`);
    }
  }

  console.log("🎉 Migration process completed!");
}

main().catch(console.error);
