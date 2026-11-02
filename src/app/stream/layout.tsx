import React from "react";
import { Navigation } from "@/components/Navigation";
import { TopTitle } from "@/components/texts";

import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";

type GroupLayoutProps = {
  children: React.ReactNode;
};

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return (
    <VerifyProvider>
      <div className={`h-full`}>
        <Navigation />
        <TopTitle className="my-5 py-3" subtitle="Page For Parents">
          保護者ページ
        </TopTitle>
        <main>{children}</main>
      </div>
    </VerifyProvider>
  );
};

export default GroupLayout;
