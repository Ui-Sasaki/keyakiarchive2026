import { twMerge } from "tailwind-merge";
import { H } from "./H";

export function Title({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <H className={twMerge("text-4xl font-bold pb-4", className || "")}>
      {children}
    </H>
  );
}
