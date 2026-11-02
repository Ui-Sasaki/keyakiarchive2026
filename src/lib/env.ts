import "server-only";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SUPABASE_URL: z.string().min(1),
  SUPABASE_ANON_KEY: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  GOOGLE_RECAPTCHA_SECRET_KEY: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  NODE_ENV: z.string().min(1),
  GRANT_PASSWORD: z.string().min(1),
  GRANT_ALL_PASSWORD: z.string().min(1),
  SUBTRACT_PASSWORD: z.string().min(1),
  SUBTRACT_ALL_PASSWORD: z.string().min(1),
  RESET_PASSWORD: z.string().min(1),
  QRCODE_LOOKUP_PASSWORD: z.string().min(1).optional(),
  STREAM_PASSWORD: z.string().min(1),
  FOOTER_SECRET_CODE: z.string().min(1),
  FOOTER_FINAL_ANSWER: z.string().min(1),
  BASIC_AUTH_USER: z.string().optional(),
  BASIC_AUTH_PASSWORD: z.string().optional(),
  MAIL_ADDRESS: z.string().optional(),
  SENDMAIL_API_URL: z.string().optional(),
  ADMIN_MAIL_ADDRESS: z.string().optional(),
  HIROOMEAL_RESERVATION_START: z.string().optional(),
  HIROOMEAL_RESERVATION_DEADLINE: z.string().optional(),
  DISCORD_BUG_REPORT_WEBHOOK_URL: z.string().optional(),
  SIGNAGE_GAS_URL: z.string().url().optional(),
  SIGNAGE_GAS_SECRET: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
