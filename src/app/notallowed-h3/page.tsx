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
 * /notallowed-h3
 */
const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <p className="mb-6">
          高校3年生及び卒業生は在校生システムにログインすることができません。
        </p>
        <ButtonAsLink href="/student-login">ログイン画面に戻る</ButtonAsLink>
      </div>
    </div>
  );
};

export default Page;
