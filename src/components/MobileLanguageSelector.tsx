"use client";

import { useCurrentLocale } from "@/hooks/useTranslations";
import { setLocaleAction } from "@/actions/locale";

interface MobileLanguageSelectorProps {
  className?: string;
}

export function MobileLanguageSelector({
  className = "",
}: MobileLanguageSelectorProps) {
  const currentLocale = useCurrentLocale();

  return (
    <li className={`rounded-lg p-2 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">言語:</span>
        <form action={setLocaleAction.bind(null, "ja")} className="flex-1">
          <button
            type="submit"
            className={`w-full px-3 py-1 text-sm rounded-l transition-colors ${
              currentLocale === "ja"
                ? "bg-foreground text-white font-medium"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            日本語
          </button>
        </form>
        <form action={setLocaleAction.bind(null, "en")} className="flex-1">
          <button
            type="submit"
            className={`w-full px-3 py-1 text-sm rounded-r transition-colors ${
              currentLocale === "en"
                ? "bg-foreground text-white font-medium"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            English (β)
          </button>
        </form>
      </div>
    </li>
  );
}
