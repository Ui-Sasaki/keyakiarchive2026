import {
  forwardRef,
  type ComponentProps,
  ComponentPropsWithoutRef,
} from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

type TextLinkProps = ComponentProps<typeof Link>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ButtonAsLinkProps = ComponentProps<"button">;

/**
 * next/linkのラッパー
 * 外部リンクを開く場合はtarget="_blank"を付与する
 * @returns TextLink
 */
export const TextLink = ({
  href,
  children,
  className,
  ...props
}: TextLinkProps) => {
  const target = String(href).startsWith("http") ? "_blank" : undefined;
  return (
    <Link
      href={href}
      className={twMerge(
        "text-blue-500 underline hover:text-blue-600",
        className,
      )}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};

// eslint-disable-next-line react/display-name
export const LinkAsButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        "text-blue-500 underline hover:text-blue-600 cursor-pointer disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed disabled:no-underline",
        className,
      )}
      {...props}
      type="button"
      ref={ref}
    >
      {children}
    </button>
  );
});
