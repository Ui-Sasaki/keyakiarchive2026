import "server-only";

import { auth } from "@/auth";

/** セッションユーザーの共通型 */
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

/**
 * 現在の認証セッション情報からユーザー情報を取得します（NextAuth版）。
 * NextAuthのセッション情報を返します。
 */
export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  const session = await auth();

  if (!session?.user) {
    return undefined;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };
};
