import { H } from "@/ui/structures/H";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

export const MypageTitle = memo(function Title({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="ml-2 mb-4 flex flex-col items-center w-fit">
      <H className="text-5xl font-medium">{children}</H>
      {subtitle && <p className="text-lg text-foreground">{subtitle}</p>}
    </div>
  );
});

export const MypageSubtitle = memo(function Subtitle({
  children,
  subtitle,
  className,
}: {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `ml-2 mb-4 flex flex-col items-center w-fit`,
        className,
      )}
    >
      <H className="text-4xl font-medium">{children}</H>
      {subtitle && <p className="text-lg text-foreground">{subtitle}</p>}
    </div>
  );
});
