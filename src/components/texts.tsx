import { twMerge } from "tailwind-merge";
//import { jackeyFont } from "@/app/fonts";//
import { mintyou } from "@/app/fonts";

export function TopTitle({
  children,
  className,
  subtitle,
  stroke = false,
  fontClass = mintyou.className,
}: {
  children: React.ReactNode;
  className?: string;
  subtitle?: React.ReactNode;
  stroke?: boolean;
  fontClass?: string;
}) {
  return (
    <h2
      className={twMerge(
        `text-4xl text-center ${fontClass} ${
          stroke ? "c-text-stroke-maintext text-white" : "text-maintext"
        } font-bold`,
        className,
      )}
    >
      {children}
      <p className="text-2xl c-text-stroke-maintext text-white">{subtitle}</p>
    </h2>
  );
}

export function TopSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={twMerge(
        `text-base md:text-3xl font-semibold text-center text-white`,
        className || "",
      )}
    >
      {children}
    </h3>
  );
}

export function Text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={twMerge(
        `text-xl text-maintext text-center font-bold`,
        className || "",
      )}
    >
      {children}
    </p>
  );
}
