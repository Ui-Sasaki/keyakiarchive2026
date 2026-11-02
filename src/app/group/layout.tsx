import React from "react";
import NextImage from "next/image";

import dynamic from "next/dynamic";
import { Metadata } from "next";
import { Navigation } from "../_home";

const Footer = dynamic(() => import("@/components/Footer"));

type GroupLayoutProps = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: "団体紹介",
  description:
    "けやき祭の発表団体紹介ページです。気になる団体があったら、ぜひチェックしましょう！",
  alternates: {
    canonical: "/group",
  },
};
const GroupLayout = ({ children }: GroupLayoutProps) => {
  return (
    <div className={`c-bg-grid`}>
      <Navigation />
      <div className="bg-gradient-to-b from-[#6A1717] to-[#CE2D2D] flex flex-col items-center">
        <div className="w-full md:w-270 pb-10 bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat">
          <div className="mx-2 md:mx-8">
            <NextImage
              src="/group/団体紹介.webp"
              alt=""
              width={400}
              height={100}
              className="hidden md:block"
            />
            <NextImage
              src="/group/団体紹介.webp"
              alt=""
              width={350}
              height={100}
              className="md:hidden"
            />
            <main>{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupLayout;
