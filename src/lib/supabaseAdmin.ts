import { createClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE ADMIN CLIENT — CHỈ DÙNG PHÍA SERVER (API Routes)
// ============================================================
// Client này sử dụng Service Role Key → bypass hoàn toàn RLS.
// TUYỆT ĐỐI KHÔNG import file này trong component "use client".
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isAdminConfigured =
  supabaseUrl.length > 0 &&
  serviceRoleKey.length > 0 &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  serviceRoleKey !== "YOUR_SERVICE_ROLE_KEY";

export const supabaseAdmin = isAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;