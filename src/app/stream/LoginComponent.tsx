"use client";

import { useForm } from "@/ui/form";
import { loginAction } from "./actions";
import { Input } from "@/ui/form/inputs/elements";
import { SubmitButton } from "@/ui/form/SubmitButton";

export function LoginComponent() {
  const { Form, register } = useForm(
    loginAction,
    { values: { verificationCode: "", password: "" } },
    {
      authenticationRequired: true,
      showToast: true,
    },
  );
  return (
    <div
      className={`w-5/6 md:w-4/5 max-w-7xl my-4 md:my-12 mx-auto p-5 pt-10 md:p-10 bg-white border-2 border-solid border-zinc-300 rounded-xl shadow relative`}
    >
      保護者ページでのライブ配信の視聴には、パスワードが必要です。パスワードは全学年の学年通信にて、けやき祭直前に掲載される予定です。
      <Form className="mt-4">
        <Input
          labelText="パスワード"
          {...register("password")}
          type="text"
        />
        <SubmitButton className="mt-4">送信</SubmitButton>
      </Form>
    </div>
  );
}
