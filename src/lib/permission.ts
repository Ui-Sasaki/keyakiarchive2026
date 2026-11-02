import { Group } from "@prisma/client";

export function canExecute(
  user: { groups: Group[] },
  requiredPermissions: readonly string[],
) {
  const userPermissions = user.groups.flatMap((group) => group.permissions);
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}
