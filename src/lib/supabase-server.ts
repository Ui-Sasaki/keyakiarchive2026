import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * サーバーコンポーネント／サーバーAPI内で利用するSupabaseクライアントを作成します。
 * App Router のサーバー環境では cookies を渡してセッション情報を読み取ります。
 */
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          return cookieStore.get(key)?.value ?? null;
        },
        setItem: (key: string, value: string) => {
          cookieStore.set(key, value);
        },
        removeItem: (key: string) => {
          cookieStore.delete(key);
        },
      },
    },
  });
};

export default createServerSupabaseClient;
