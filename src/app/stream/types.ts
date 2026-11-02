import { z, type ZodType } from "zod";

import { type FormState } from "@/ui/form";

export type LoginFormValues = {
  password: string;
};

export type LoginFormState = FormState<LoginFormValues>;

export const initialLoginFormValues = {
  values: {
    password: "",
    verificationCode: "",
  },
} as const satisfies LoginFormState;

/** プロフィールフォームのバリデーション */
export const LoginFormSchema: ZodType<LoginFormValues> = z.object({
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});
