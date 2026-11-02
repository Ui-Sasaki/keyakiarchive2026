import { twMerge } from "tailwind-merge";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const c = twMerge(
    "relative overflow-x-auto shadow-md rounded sm:rounded-lg",
    className ?? "",
  );
  return (
    <div className={c}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        {children}
      </table>
    </div>
  );
}
