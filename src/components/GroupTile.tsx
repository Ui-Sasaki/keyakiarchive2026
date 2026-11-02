"use client";

import { Group } from "@prisma/client";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { getActionsForPermissionsWithLocale } from "@/constants/permissions";
import { useTranslations, useLocale } from "next-intl";

interface GroupTileProps {
  group: Group;
}

export default function GroupTile({ group }: GroupTileProps) {
  const t = useTranslations("mypage.groups");
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // 英語の場合はenNameを使用、ない場合はnameにフォールバック
  const groupName = locale === "en" && group.enName ? group.enName : group.name;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={handleToggle}
        className="w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("permissionsCount", {
                count: group.permissions.length,
              })}
            </p>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" />
            ) : (
              <MdKeyboardArrowRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {t("availableActions")}
          </h4>
          <div className="space-y-2">
            {getActionsForPermissionsWithLocale(group.permissions, locale).map(
              (action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className="block w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {action.icon && (
                        <div className="flex-shrink-0 text-gray-500 group-hover:text-blue-600">
                          {action.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                          {action.label}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 group-hover:text-blue-700">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <MdKeyboardArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                  </div>
                </Link>
              ),
            )}
          </div>
          {getActionsForPermissionsWithLocale(group.permissions, locale)
            .length === 0 && (
            <p className="text-sm text-gray-500 italic">
              {t("noActionsAvailable")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
