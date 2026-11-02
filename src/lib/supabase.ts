import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

// Supabaseクライアントの作成
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export default supabase;
