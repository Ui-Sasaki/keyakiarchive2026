"use client";

import { TextLink } from "@/ui/link/TextLink";
import { Log } from "@prisma/client";
import { formatJSTDateSeconds } from "./date";
import { LOG_TYPE } from "@/constants/log";
import { robotoMono } from "@/app/fonts";

export const formatLog = (log: Log) => {
  const type = log.type as keyof typeof LOG_TYPE;
  const executor = log.executorId;
  const target = log.targetId;
  const createdAt = log.createdAt;
  const subtype = log.subtype;
  const details1 = log.details1;
  const details2 = log.details2;

  const details3 = log.details3;

  let parsed;
  switch (type) {
    case "newusers":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          が作成されました (メールアドレス: {details1})
        </>
      );
      break;
    case "rights":
      if (
        subtype === "manual" ||
        subtype === "individual" ||
        subtype === null
      ) {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            が <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
            のグループを変更しました (設定したグループ: {details1})
          </>
        );
      } else if (subtype === "newusers") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            が自身の役職を {details1} にしました
          </>
        );
      } else if (subtype === "bulk") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            が <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
            のグループを一括変更しました ({details1})
          </>
        );
      }
      break;
    case "groups":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink> が{" "}
          <TextLink href={`/mypage/groups/${details1}`}>{details1}</TextLink>{" "}
          の権限を変更しました (設定した権限: {details2})
        </>
      );
      break;
    case "tickets":
      if (subtype === "create") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がチケットを作成しました (チケットID: {details1})
          </>
        );
      } else if (subtype === "delete") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がチケットを削除しました (チケットID: {details1})
          </>
        );
      } else if (subtype === "update") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がチケットを更新しました (チケットID: {details1}, {details2})
          </>
        );
      }
      break;
    case "scanticket":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がチケットをスキャンし、入場済みにしました (チケットID: {details1})
        </>
      );
      break;
    case "lock":
      if (subtype === "lock") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がアカウント{" "}
            <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
            をロックしました (理由: {details1})
          </>
        );
      } else if (subtype === "unlock") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がアカウント{" "}
            <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
            のロックを解除しました (理由: {details1})
          </>
        );
      }
      break;
    case "edituserinfo":
      if (subtype === "sysop") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がアカウント{" "}
            <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
            の情報を変更しました (変更後: {details1})
          </>
        );
      }
      break;
    case "vanish":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がアカウント {details1} (メールアドレス: {details2}) を抹消しました
          (理由: {details3})
        </>
      );
      break;
    case "createTeam":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がチーム {details1} を作成しました
        </>
      );
      break;
    case "reNameTeam":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          {details1} {details2}
        </>
      );
      break;
    case "deleteTeam":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          {details1}
        </>
      );
      break;
    case "addMember":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がチーム {details1} {details2}
        </>
      );
      break;
    case "deleteMember":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がチーム {details1} からメンバー {details2} を削除しました
        </>
      );
      break;
    case "editProducts":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          {details1}しました
        </>
      );
      break;
    case "news":
      if (subtype === "create") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がニュース {details1} を配信しました
          </>
        );
      } else if (subtype === "edit") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がニュース {details1} を編集しました
          </>
        );
      }
      break;
    case "siteinfo":
      if (subtype === "edit") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がサイト情報を編集しました (変更内容: {details1})
          </>
        );
      }
      break;
    case "editPresentation":
      if (subtype === "create") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーション {details1} を作成しました
          </>
        );
      } else if (subtype === "update") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーション {details1} を編集しました
          </>
        );
      } else if (subtype === "delete") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーション情報を削除しました
          </>
        );
      } else if (subtype === "setLeader") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーションの発表者を{" "}
            <TextLink href={`/mypage/users/${details1}`}>{details1}</TextLink>{" "}
            に設定しました
          </>
        );
      } else if (subtype === "removeLeader") {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーションの発表者設定を解除しました
          </>
        );
      } else if (subtype === "clearMembers") {
        let memberInfo;
        try {
          const memberData = JSON.parse(details1 || "{}");
          memberInfo = `${memberData.membersCount}名のメンバー (${memberData.memberEmails?.join(", ") || ""})`;
        } catch {
          memberInfo = "共同発表メンバー";
        }
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーションを削除し、{memberInfo}の参加を解除しました
          </>
        );
      } else {
        parsed = (
          <>
            アカウント{" "}
            <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
            がプレゼンテーション情報を更新しました
          </>
        );
      }
      break;
    case "changeHirooPay":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink> が
          {details1}しました (理由: {details2 || "なし"})
        </>
      );
      break;
    case "lookupHirooPayQR":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink> が{" "}
          <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>{" "}
          のHirooPay QRコードを照会しました (QRコード: {details1 || "不明"})
        </>
      );
      break;
    case "deletePresentation":
      parsed = (
        <>
          アカウント{" "}
          <TextLink href={`/mypage/users/${executor}`}>{executor}</TextLink>{" "}
          がプレゼンテーション &ldquo;{details1 || "不明"}&rdquo; (ID:{" "}
          {details2 || "不明"}) を削除しました
          {target && (
            <>
              {" "}
              (所有者:{" "}
              <TextLink href={`/mypage/users/${target}`}>{target}</TextLink>)
            </>
          )}
        </>
      );
      break;
    default:
      parsed = <>不明なログタイプ: {type}</>;
      break;
  }
  // Unhandled subtype would otherwise render an empty log entry
  if (!parsed) {
    parsed = (
      <>
        不明なログ (種別: {type}, 詳細種別: {subtype ?? "なし"})
      </>
    );
  }
  parsed = (
    <span>
      <span className={`${robotoMono.className}`}>
        {formatJSTDateSeconds(createdAt)}
      </span>{" "}
      {parsed}
    </span>
  );
  return parsed;
};
