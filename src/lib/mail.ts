import { env } from "@/lib/env";

const sendMail = async (options: {
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<unknown> => {
  return await fetch(`${env.SENDMAIL_API_URL}/sendmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
};

/**
 * 管理者にメールを送信する
 * 問い合わせフォームなどで使用する
 * @param from 送信者名
 * @param subject 件名
 * @param text 本文
 * @returns 送信が成功したかどうか
 */
export const sendMailToAdmin = async (
  from: string,
  subject: string,
  text: string,
) => {
  const options = {
    from,
    to: env.ADMIN_MAIL_ADDRESS!,
    subject,
    text,
  };
  return await sendMail(options);
};

/**
 * ユーザーにメールを送信する
 * @param to 送信先メールアドレス
 * @param subject 件名
 * @param text 本文
 * @returns 送信が成功したかどうか
 */
export const sendMailToUser = async (
  to: string,
  subject: string,
  text: string,
) => {
  const fullText = `${text}\n\n----------\nこのメールは送信専用です、返信しないようお願いします。\n広尾学園 広報部門`; // 本文と署名をマージ
  const options = {
    from: `2026年けやき祭 <${env.MAIL_ADDRESS}>`,
    to,
    subject,
    text: fullText,
  };
  return await sendMail(options);
};
