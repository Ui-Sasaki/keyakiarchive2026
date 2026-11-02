import React from "react";
import { Navigation } from "@/components/Navigation";

type GroupLayoutProps = {
  children: React.ReactNode;
};

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return (
    <div className={`c-bg-grid`}>
      <Navigation />
      <main className="">{children}</main>
    </div>
  );
};

export default GroupLayout;
