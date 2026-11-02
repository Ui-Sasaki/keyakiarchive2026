import {
  MdGroup,
  MdSecurity,
  MdSearch,
  MdQrCodeScanner,
  MdGroups,
  MdDescription,
  MdConfirmationNumber,
  MdCode,
  MdAnnouncement,
  MdPayment,
  MdPeople,
  MdSettings,
  MdBarChart,
  MdSlideshow,
  MdRestaurant,
} from "react-icons/md";

export const PERMISSIONS = {
  modifyusergroups: "全利用者の利用者グループを変更",
  modifygrouppermissions: "全グループの権限を変更",
  searchusers: "利用者を検索し、基本的な情報を表示",
  readticket: "チケットのQRコードをスキャンし、入場済みにする",
  manageteam: "チームを作成し、あらゆるチームを変更・メンバー管理・削除",
  viewlogs: "ログを閲覧",
  createticket: "チケットを発行",
  noticketlimit: "チケットの発行数制限を無視",
  viewuserinfo: "あらゆる利用者の情報を閲覧",
  modifyuserinfo: "あらゆる利用者の情報を変更",
  lockuser: "利用者をロック・ロック解除",
  vanishuser: "利用者を抹消",
  developer: "開発者権限",
  managenews: "ニュースを配信・管理",
  managehiroopay: "HirooPayを管理",
  reportcongestion: "混雑状況報告",
  editsiteinfo: "サイト情報を編集",
  viewstatistics: "統計情報を閲覧",
  managepresentations: "プレゼン情報を管理",
  usehiroopay: "HirooPayを利用",
  usehiroomeal: "HirooMealを利用",
  createpresentation: "プレゼンテーションを登録",
} as const;

export const PERMISSIONS_EN = {
  modifyusergroups: "Modify user groups for all users",
  modifygrouppermissions: "Modify permissions for all groups",
  searchusers: "Search users and display basic information",
  readticket: "Scan ticket QR codes and mark as entered",
  manageteam: "Create teams and manage any team, members, and deletion",
  viewlogs: "View logs",
  createticket: "Issue tickets",
  noticketlimit: "Ignore ticket issuance limit",
  viewuserinfo: "View information of any user",
  modifyuserinfo: "Modify information of any user",
  lockuser: "Lock/unlock users",
  vanishuser: "Delete users permanently",
  developer: "Developer privileges",
  managenews: "Distribute and manage news",
  managehiroopay: "Manage HirooPay",
  reportcongestion: "Report congestion status",
  editsiteinfo: "Edit site information",
  viewstatistics: "View statistics",
  managepresentations: "Manage presentation information",
  usehiroopay: "Use HirooPay",
  usehiroomeal: "Use HirooMeal",
  createpresentation: "Register presentation",
} as const;

// 権限とそれに対応するページ・機能の定義
export interface PermissionAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon?: React.ReactElement;
}

// 簡略化された権限アクション（英語版用）
export interface PermissionActionSimple {
  id: string;
  label: string;
  description: string;
}

// 権限別のアクション定義
export const PERMISSION_ACTIONS: Record<string, PermissionAction[]> = {
  modifyusergroups: [
    {
      id: "user-groups",
      label: "ユーザー権限管理",
      description: "利用者のグループを変更",
      href: "/mypage/userrights",
      icon: <MdGroup />,
    },
  ],
  modifygrouppermissions: [
    {
      id: "group-permissions",
      label: "グループ権限管理",
      description: "グループの権限を設定",
      href: "/mypage/groups",
      icon: <MdSecurity />,
    },
  ],
  searchusers: [
    {
      id: "user-search",
      label: "利用者検索",
      description: "利用者を検索・情報表示",
      href: "/mypage/users",
      icon: <MdSearch />,
    },
  ],
  readticket: [
    {
      id: "ticket-scan",
      label: "チケットスキャン",
      description: "QRコードスキャンで入場処理",
      href: "/mypage/readticket",
      icon: <MdQrCodeScanner />,
    },
  ],
  manageteam: [
    {
      id: "team-management",
      label: "チーム管理",
      description: "チームの作成・編集・削除",
      href: "/mypage/teams",
      icon: <MdGroups />,
    },
  ],
  viewlogs: [
    {
      id: "system-logs",
      label: "システムログ",
      description: "システムログを閲覧",
      href: "/mypage/logs",
      icon: <MdDescription />,
    },
  ],
  createticket: [
    {
      id: "ticket-create",
      label: "チケット発行",
      description: "新しいチケットを発行",
      href: "/mypage/ticket",
      icon: <MdConfirmationNumber />,
    },
  ],
  viewuserinfo: [],
  modifyuserinfo: [],
  lockuser: [],
  vanishuser: [],
  developer: [
    {
      id: "developer-tools",
      label: "開発者ツール",
      description: "開発者向け機能",
      href: "/mypage/test",
      icon: <MdCode />,
    },
  ],
  managenews: [
    {
      id: "news-management",
      label: "ニュース管理",
      description: "お知らせの配信・管理",
      href: "/mypage/news-management",
      icon: <MdAnnouncement />,
    },
  ],
  managehiroopay: [
    {
      id: "hiroopay-admin",
      label: "HirooPay管理",
      description: "決済システムの管理",
      href: "/mypage/hiroopay-management",
      icon: <MdPayment />,
    },
  ],
  reportcongestion: [
    {
      id: "congestion-report",
      label: "混雑状況報告",
      description: "会場の混雑状況を報告",
      href: "/mypage/congestion-report",
      icon: <MdPeople />,
    },
  ],
  editsiteinfo: [
    {
      id: "site-settings",
      label: "サイト設定",
      description: "サイト情報の編集",
      href: "/mypage/siteinfo",
      icon: <MdSettings />,
    },
  ],
  viewstatistics: [
    {
      id: "statistics",
      label: "統計情報",
      description: "各種統計データの閲覧",
      href: "/mypage/statistics",
      icon: <MdBarChart />,
    },
  ],
  managepresentations: [
    {
      id: "presentation-admin",
      label: "プレゼン管理",
      description: "発表情報の管理",
      href: "/mypage/presentation-management",
      icon: <MdSlideshow />,
    },
  ],
  usehiroopay: [
    {
      id: "hiroopay",
      label: "HirooPay",
      description: "HirooPayを利用",
      href: "/mypage/hiroopay",
      icon: <MdPayment />,
    },
  ],
  usehiroomeal: [
    {
      id: "hiroomeal",
      label: "HirooMeal予約",
      description: "HirooMealの整理券登録",
      href: "/mypage/hiroomeal",
      icon: <MdRestaurant />,
    },
  ],
  createpresentation: [
    {
      id: "my-presentation",
      label: "プレゼンテーション登録",
      description: "自分のプレゼンを管理",
      href: "/mypage/presentation",
      icon: <MdSlideshow />,
    },
  ],
  // 一般的な学生権限
  student: [],
};

// English version of permission actions (simplified)
export const PERMISSION_ACTIONS_EN: Record<string, PermissionActionSimple[]> = {
  modifyusergroups: [
    {
      id: "user-groups",
      label: "User Rights Management",
      description: "Modify user groups",
    },
  ],
  modifygrouppermissions: [
    {
      id: "group-permissions",
      label: "Group Rights Management",
      description: "Set group permissions",
    },
  ],
  searchusers: [
    {
      id: "user-search",
      label: "User Search",
      description: "Search users and display information",
    },
  ],
  readticket: [
    {
      id: "ticket-scan",
      label: "Ticket Scan",
      description: "Process entry with QR code scan",
    },
  ],
  manageteam: [
    {
      id: "team-management",
      label: "Team Management",
      description: "Create, edit, and delete teams",
    },
  ],
  viewlogs: [
    {
      id: "system-logs",
      label: "System Logs",
      description: "View system logs",
    },
  ],
  createticket: [
    {
      id: "ticket-create",
      label: "Issue Tickets",
      description: "Issue new tickets",
    },
  ],
  viewuserinfo: [],
  modifyuserinfo: [],
  lockuser: [],
  vanishuser: [],
  developer: [
    {
      id: "developer-tools",
      label: "Developer Tools",
      description: "Developer features",
    },
  ],
  managenews: [
    {
      id: "news-management",
      label: "News Management",
      description: "Distribute and manage announcements",
    },
  ],
  managehiroopay: [
    {
      id: "hiroopay-admin",
      label: "HirooPay Management",
      description: "Manage payment system",
    },
  ],
  reportcongestion: [
    {
      id: "congestion-report",
      label: "Congestion Report",
      description: "Report venue congestion status",
    },
  ],
  editsiteinfo: [
    {
      id: "site-settings",
      label: "Site Settings",
      description: "Edit site information",
    },
  ],
  viewstatistics: [
    {
      id: "statistics",
      label: "Statistics",
      description: "View various statistical data",
    },
  ],
  managepresentations: [
    {
      id: "presentation-admin",
      label: "Presentation Management",
      description: "Manage presentation information",
    },
  ],
  usehiroopay: [
    {
      id: "hiroopay",
      label: "HirooPay",
      description: "Use HirooPay",
    },
  ],
  usehiroomeal: [
    {
      id: "hiroomeal",
      label: "HirooMeal Reservation",
      description: "Register for HirooMeal tickets",
    },
  ],
  // General student permissions
  createpresentation: [
    {
      id: "my-presentation",
      label: "Presentation Registration",
      description: "Manage your presentation",
    },
  ],
};

// 権限からアクションリストを取得する関数
export function getActionsForPermissions(
  permissions: string[],
): PermissionAction[] {
  const actions: PermissionAction[] = [];

  permissions.forEach((permission) => {
    const permissionActions = PERMISSION_ACTIONS[permission];
    if (permissionActions) {
      actions.push(...permissionActions);
    }
  });

  // 重複を除去（同じhrefのアクションは1つだけ残す）
  const uniqueActions = actions.filter(
    (action, index, self) =>
      index === self.findIndex((a) => a.href === action.href),
  );

  return uniqueActions;
}

// ロケールに応じて権限からアクションリストを取得する関数
export function getActionsForPermissionsWithLocale(
  permissions: string[],
  locale: string = "ja",
): PermissionAction[] {
  const actions: PermissionAction[] = [];

  permissions.forEach((permission) => {
    if (locale === "en") {
      // 英語版: シンプル版から完全版に変換
      const englishActions = PERMISSION_ACTIONS_EN[permission];
      const originalActions = PERMISSION_ACTIONS[permission];

      if (englishActions && originalActions) {
        englishActions.forEach((englishAction, index) => {
          const originalAction = originalActions[index];
          if (originalAction) {
            actions.push({
              ...englishAction,
              href: originalAction.href,
              icon: originalAction.icon,
            });
          }
        });
      }
    } else {
      // 日本語版: そのまま使用
      const permissionActionList = PERMISSION_ACTIONS[permission];
      if (permissionActionList) {
        actions.push(...permissionActionList);
      }
    }
  });

  // 重複を除去（同じhrefのアクションは1つだけ残す）
  const uniqueActions = actions.filter(
    (action, index, self) =>
      index === self.findIndex((a) => a.href === action.href),
  );

  return uniqueActions;
}

// ロケールに応じて権限の説明を取得する関数
export function getPermissionDescription(
  permission: string,
  locale: string = "ja",
): string {
  const permissions = locale === "en" ? PERMISSIONS_EN : PERMISSIONS;
  return permissions[permission as keyof typeof permissions] || permission;
}
