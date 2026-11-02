"use client";

import { LinkAsButton } from "@/ui/link/TextLink";
import { memo } from "react";

export const ReloadLink = memo(function ReloadLink() {
  return (
    <LinkAsButton onClick={() => location.reload()}>リロード</LinkAsButton>
  );
});
