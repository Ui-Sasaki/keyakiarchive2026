import { PERMISSIONS } from "@/constants/permissions";
import { H } from "@/ui/structures/H";

export function NoPermissions({
  requiredPermissions,
}: {
  requiredPermissions: string[];
}) {
  return (
    <div className="p-4">
      <H className="text-3xl">権限がありません</H>
      <p>このページを見るには以下の権限が必要です。</p>
      <ul className="list-disc pl-4">
        {requiredPermissions.map((permission, i) => (
          <li key={i}>{PERMISSIONS[permission as keyof typeof PERMISSIONS]}</li>
        ))}
      </ul>
    </div>
  );
}
