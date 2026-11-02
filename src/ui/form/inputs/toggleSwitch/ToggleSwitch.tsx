import { twMerge } from "tailwind-merge";

type ToggleSwitchProps = {
  /** ラベル */
  labelText?: string;
} & Omit<React.ComponentProps<"input">, "type">;

/**
 * チェックボックス
 * @param props プロパティ
 */
export const ToggleSwitch = ({
  labelText,
  className = "",
  ...props
}: ToggleSwitchProps) => (
  <label className="inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" {...props} />
    <div
      className={twMerge(
        `relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shrink-0`,
        className,
      )}
    ></div>
    <span className="ml-2 text-gray-700">{labelText}</span>
  </label>
);
