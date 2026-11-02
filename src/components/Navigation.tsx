"use client";
import { memo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { menuOpenAtom } from "@/atoms/navigationAtom";
import { PUBLISH_PROGRESS } from "@/constants/site";
import { siranu } from "../app/fonts";

/**
 * Navigation component
 */
function NavigationInside({ absolute: _ }: { absolute?: boolean }) {
  const [menuOpen, setMenuOpen] = useAtom(menuOpenAtom);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // メニューが開いているときはスクロール禁止
    } else {
      document.body.style.overflow = "auto"; // メニューが閉じているときはスクロール許可
    }
    return () => {
      document.body.style.overflow = "auto"; // クリーンアップ
    };
  }, [menuOpen]);

  const menuItems = [
    { text: "トップ", href: "/" },
    { text: "団体", href: "/group" },
    { text: "販売", href: "/sales" },
    { text: "プレゼン検索", href: "/presentation" },
    { text: "タイムテーブル", href: "/table" },
    { text: "校内マップ", href: "/map" },
    { text: "ご来校の方へ", href: "/forVisiters", changeColor: true },
  ];

  return (
    <>
      <div className="h-[0px]" />
      <header
        className={`will-change-transform left-0 flex justify-end items-center h-[60px] lg:h-[95px] gap-5 text-white lg:text-black text-xl z-50 w-full min-h-[72px] transform-gpu ${
          menuOpen
            ? "bg-white backdrop-blur-sm"
            : "bg-[#CE2D2D] lg:bg-[#FFFFF8] lg:border-b lg:border-amber-950"
        } transition-all duration-300`}
      >
        <div className="mr-auto flex items-center">
          <Image
            src="/logo.webp"
            alt="logo"
            width={70}
            height={50}
            style={{ height: "auto" }}
            className="hidden lg:block ml-4 mr-2"
          />
          <Link
            href="/"
            className={`${siranu.className} lg:text-black text-base ml-10 lg:ml-2 tracking-[2.5px]`}
          >
            2026けやき祭
          </Link>
        </div>

        {/* PC用メニュー */}
        <nav className="hidden lg:block">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link href={item.href}>
                  <div
                    className={`${item.changeColor ? "bg-[#121E3C]  text-white" : ""} h-[95px] hover:bg-[#9C2A27] hover:text-[#FFFFF8] border-amber-950  border-l flex flex-col justify-center transition-colors`}
                  >
                    <div className=" text-[13.5px] px-6 py-1 ">{item.text}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ハンバーガーボタン（モバイル） */}
        <div className="lg:hidden relative w-[90px] h-[60px] flex flex-col justify-center items-center">
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            className={`relative w-10 h-7 flex flex-col justify-between bg-transparent border-none cursor-pointer z-50`}
          >
            <span
              className={`absolute w-10 h-0.5 bg-white transition-all duration-500 rounded-sm ${menuOpen ? "top-3 rotate-45" : "top-1.5"}`}
            ></span>
            <span
              className={`absolute w-10 h-0.5 bg-white transition-all duration-500 rounded-sm ${menuOpen ? "top-3 -rotate-45" : "top-4.5"}`}
            ></span>
          </button>
        </div>
      </header>

      {/* オーバーレイメニュー */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#ce2d2d] backdrop-blur-sm transition-all duration-500 z-40 flex flex-col ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-hidden={!menuOpen}
      >
        {/* top bar inside overlay: logo left, close button right */}
        <div className="w-full flex items-center justify-end h-[72px] bg-white">
          <div className="relative w-[90px] h-[60px] flex flex-col justify-center items-center">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="閉じる"
              className="relative w-10 h-7 flex flex-col justify-between bg-transparent border-none cursor-pointer z-50"
            >
              <span
                className={`absolute w-10 h-0.5 bg-[#ce2d2d] transition-all duration-500 rounded-sm ${menuOpen ? "top-3 rotate-45" : "top-1.5"}`}
              ></span>
              <span
                className={`absolute w-10 h-0.5 bg-[#ce2d2d] transition-all duration-500 rounded-sm ${menuOpen ? "top-3 -rotate-45" : "top-4.5"}`}
              ></span>
            </button>
          </div>
        </div>

       
<div className="w-full h-24 flex items-center justify-center">
  <div className="h-full w-full bg-[#121E3C]">
    <Link href="/forVisiters" onClick={() => setMenuOpen(false)}>
      <div className="text-white h-full border-[#ce2d2d] border flex flex-col justify-center">
        <div className="text-[20px] text-center px-1 py-1">
          ご来校の方へ
        </div>
      </div>
    </Link>
  </div>
</div>


        <div className="w-full px-12 pt-6 pb-8 flex-1 flex flex-col justify-start min-h-0 overflow-y-auto">
          <ul className="list-none space-y-6 md:space-y-8 max-w-md w-full">
            {menuItems
  .filter(
    (item) =>
      item.text !== "生徒ページ | ログイン" &&
      item.text !== "ご来校の方へ",
  )
  .map((item, index) => (
    <li
      key={item.text}
      className={`transition-all duration-500 ${
        menuOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-5"
      }`}
      style={{
        transitionDelay: menuOpen ? `${0.05 * (index + 1)}s` : "0s",
      }}
      onClick={() => setMenuOpen(false)}
    >
      <Link
        href={item.href}
        className="block w-full text-black text-[24px] md:text-[26px] font-medium no-underline transition-colors duration-300 py-2 px-1 text-left" >
        {item.text}
      </Link>
    </li>
))}{" "}
     </ul>
        </div>
      </div>
    </>
  );
}

export const Navigation = memo(NavigationInside);
