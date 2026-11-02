import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { ReactNode } from "react";

interface ServerI18nProviderProps {
  children: ReactNode;
}

export async function ServerI18nProvider({
  children,
}: ServerI18nProviderProps) {
  // サーバーサイドで言語とメッセージを取得
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
