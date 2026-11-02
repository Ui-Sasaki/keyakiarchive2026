"use server";

import { env } from "@/lib/env";
import { LoginFormSchema, type LoginFormState } from "./types";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";

/**
 * @param prevState 前の状態
 * @param formData FormData
 */
export const loginAction = async (
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const values = getFormValues(formData, prevState.values);
  const { verificationCode, password } = values;

  const verifyResult = await verifyForm(verificationCode);
  if (verifyResult.isFailure) {
    return {
      ...prevState,
      result: {
        message: verifyResult.error,
        type: "error",
      },
    };
  }
  const validated = LoginFormSchema.safeParse({
    ...values,
  });
  if (!validated.success) {
    const message = validated.error.issues[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }

  if (password === env.STREAM_PASSWORD) {
    const c = await cookies();
    c.set(
      "stream_credentials",
      createHash("sha256").update(password).digest("hex"),
    );
    return {
      ...prevState,
      result: {
        message: "認証に成功しました",
        type: "success",
        reload: true,
      },
    };
  } else {
    return {
      ...prevState,
      result: {
        message: "パスワードが違います",
        type: "error",
      },
    };
  }
};
