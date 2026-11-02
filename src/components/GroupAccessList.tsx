import { Group } from "@prisma/client";
import GroupTile from "./GroupTile";
import { useTranslations } from "next-intl";

interface GroupAccessListProps {
  groups: Group[];
}

export default function GroupAccessList({ groups }: GroupAccessListProps) {
  const t = useTranslations("mypage.groups");

  if (groups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t("noGroups")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
        {groups.map((group) => (
          <GroupTile key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
