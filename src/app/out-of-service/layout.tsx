import { Metadata } from "next";
import React from "react";

type GroupLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default GroupLayout;
