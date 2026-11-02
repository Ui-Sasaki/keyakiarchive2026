import React from "react";
import { Navigation } from "@/components/Navigation";
import { Metadata } from "next";

type MapLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "マップ&混雑状況",
  description: "学園のマップと混雑状況をリアルタイムに確認できます。",
  alternates: {
    canonical: "/map",
  },
};

export default function MapLayout({ children }: MapLayoutProps) {
  return (
    <div className="w-full">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}