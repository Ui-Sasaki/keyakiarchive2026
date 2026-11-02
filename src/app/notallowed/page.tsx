import { ButtonAsLink } from "@/ui/buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 *
 * /notallowed
 */
const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <p className="mb-6">
          アカウントは @hiroogakuen.com のGoogleアカウントのみ利用可能です。
        </p>
        <ButtonAsLink href="/student-login">ログイン画面に戻る</ButtonAsLink>
      </div>
    </div>
  );
};

export default Page;
