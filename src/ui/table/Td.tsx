import { twMerge } from "tailwind-merge";

export function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={twMerge("px-3 py-2 lg:px-6 lg:py-4", className || "")}>
      {children}
    </td>
  );
}
