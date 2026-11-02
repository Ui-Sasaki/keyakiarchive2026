import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "校内マップ",
  description: "けやき祭の校内マップです。",
  alternates: {
    canonical: "/map",
  },
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}