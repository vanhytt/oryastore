import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

const isBrowser = typeof window !== "undefined";

export const supabase = isSupabaseConfigured
  ? isBrowser
    ? createBrowserClient(supabaseUrl, supabaseAnonKey)
    : createSupabaseClient(supabaseUrl, supabaseAnonKey)
  : null;