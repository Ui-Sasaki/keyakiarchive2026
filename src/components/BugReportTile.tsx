import { ButtonAsLink } from "@/ui/buttons";
import { useTranslations } from "next-intl";

export default function BugReportTile() {
  const t = useTranslations("bugReport.tile");

  // TODO: Replace this placeholder with the actual Google Form URL.
  const googleFormUrl = "https://forms.gle/tyLAXFpGFqD3ENsZ7";

  return (
    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-lg font-bold">{t("title")}</h3>
      </div>
      <p className="mb-4 text-sm">{t("description")}</p>
      <ButtonAsLink
        href={googleFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-200 hover:bg-indigo-300 hover:text-black no-underline text-black px-4 py-2 rounded transition-colors"
      >
        {t("button")}
      </ButtonAsLink>
    </div>
  );
}
