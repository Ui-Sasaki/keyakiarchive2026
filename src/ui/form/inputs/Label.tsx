import { memo, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  required?: boolean;
};

export const Label = memo(
  ({
    required,
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"label"> & LabelProps) => (
    <label
      className={twMerge(
        "label justify-start",
        required
          ? "after:pl-1 after:text-xl after:text-red-500 after:content-['*']"
          : "",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  ),
);

Label.displayName = "Label";
