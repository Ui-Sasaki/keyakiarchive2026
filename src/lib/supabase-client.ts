import { createClient } from "@supabase/supabase-js";

// ブラウザ用Supabaseクライアント (NEXT_PUBLIC_ 変数を使用)
// クライアント環境では process.env.NEXT_PUBLIC_* が利用可能
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY)",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
};

// データベース型定義用（将来的にSupabase CLIで生成）
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Database = {
  // 型定義は後でSupabase CLIで自動生成される
};
