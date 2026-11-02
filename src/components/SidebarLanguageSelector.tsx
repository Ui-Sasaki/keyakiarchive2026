"use client";

import { useCurrentLocale } from "@/hooks/useTranslations";
import { setLocaleAction } from "@/actions/locale";

interface SidebarLanguageSelectorProps {
  className?: string;
}

export function SidebarLanguageSelector({
  className = "",
}: SidebarLanguageSelectorProps) {
  const currentLocale = useCurrentLocale();

  return (
    <div className={`mx-6 mb-2 ${className}`}>
      <div className="flex items-center justify-center gap-1">
        <form action={setLocaleAction.bind(null, "ja")} className="flex-1">
          <button
            type="submit"
            className={`w-full px-2 py-1 text-xs rounded-l transition-colors ${
              currentLocale === "ja"
                ? "bg-white text-foreground font-medium"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            日本語
          </button>
        </form>
        <form action={setLocaleAction.bind(null, "en")} className="flex-1">
          <button
            type="submit"
            className={`w-full px-2 py-1 text-xs rounded-r transition-colors ${
              currentLocale === "en"
                ? "bg-white text-foreground font-medium"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            English (β)
          </button>
        </form>
      </div>
    </div>
  );
}
