import { H } from "@/ui/structures/H";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import crypto from "node:crypto";
import { LoginComponent } from "./LoginComponent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "アリーナ配信",
  description: "保護者限定のアリーナ配信ページです。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StreamPage() {
  const cookieStore = await cookies();
  const streamCredentials = cookieStore.get("stream_credentials");
  const password = env.STREAM_PASSWORD;

  if (
    streamCredentials?.value !==
    crypto.createHash("sha256").update(password).digest("hex")
  ) {
    return <LoginComponent />;
  }

  return (
    <div
      className={`w-11/12 md:w-4/5 max-w-4xl my-6 md:my-16 mx-auto p-8 pt-10 md:p-14 bg-white border-2 border-solid border-zinc-300 rounded-xl shadow relative`}
    >
      <H className="text-center text-2xl md:text-3xl underline mb-6">～アリーナ配信～</H>

      {/* SVG枠・動画エリア全体（最大幅を max-w-md や max-w-lg に絞って動画を小さく） */}
      <div className="relative my-8 max-w-lg mx-auto p-6 md:p-10">
        {/* SVG飾り枠 */}
        <svg
          className="w-full h-full absolute top-0 left-0 pointer-events-none"
          viewBox="0 0 1031 587"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M973.948 578.618H57.0533C57.0533 551.739 35.2498 529.974 8.38672 529.974V57.0263C35.2778 57.0263 57.0533 35.2328 57.0533 8.38208H973.948C973.948 35.2608 995.752 57.0263 1022.61 57.0263V529.974C995.724 529.974 973.948 551.767 973.948 578.618Z"
            stroke="#231815"
            strokeWidth="6"
            strokeMiterlimit="10"
          />
          <path
            d="M946.219 550.901H84.7838C73.5746 522.094 67.313 513.545 36.1172 502.257V84.7431C64.0704 75.914 73.7143 67.2804 84.7838 36.0989H946.219C955.891 60.5188 967.184 73.9302 994.886 84.7431V502.257C967.128 512.874 954.018 524.469 946.219 550.901Z"
            stroke="#231815"
            strokeWidth="4"
            strokeMiterlimit="10"
          />
        </svg>

        {/* 16:9 埋め込み動画 */}
        <div className="relative pt-[56.25%] w-full overflow-hidden rounded">
          <iframe
            src="https://vimeo.com/event/6239850/embed/ed79145074/interaction"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}