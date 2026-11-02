"use client";

import { useState, useEffect } from "react";
import { H } from "@/ui/structures/H";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/ui";
import { BrowserView, MobileView } from "react-device-detect";
import TicketDesign from "@/components/TicketDesign";
import { dotGothic } from "@/app/fonts";

export default function QRCodePresenter({
  value,
  message,
  name,
}: {
  value: string;
  message: string;
  name: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // モーダルが開いているときにEscキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // モーダルが開いているときに背景スクロールを無効化
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isModalOpen]);

  return (
    <div className="p-4 pb-24 md:pb-0">
      <H className="text-4xl">けやき祭チケット</H>

      {/* PC版 - TicketDesignを使用 */}
      <BrowserView>
        <div className="flex justify-center my-8">
          <TicketDesign className="relative">
            <div className="ml-16 flex items-end gap-8">
              <div className={`text-xl ${dotGothic.className} text-accent`}>
                氏名
              </div>
              <div
                className={`${name.length < 8 ? "text-4xl" : name.length < 12 ? "text-3xl" : "text-2xl"} font-sans font-semibold`}
              >
                {name}
              </div>
            </div>
            <div className="ml-12 mt-8 text-xl font-sans w-[27rem] h-14">
              {message}
            </div>

            {/* QRコードを切り離し部分の左に配置 */}
            <div className="absolute top-28 -translate-y-1/2 right-56 flex flex-col items-center">
              <div
                className="grid place-items-center bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={openModal}
                title="クリックして拡大"
              >
                <QRCodeCanvas value={value} size={150} level="H" />
              </div>
              <p
                className={`text-center text-sm text-foreground ${dotGothic.className}`}
              >
                ↑クリックで拡大
              </p>
            </div>
          </TicketDesign>
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="list-disc pl-4 space-y-2">
            <li>このQRコードを係に見せることで入場できます。</li>
            <li>QRコードは一度しか使用できません。</li>
            <li>提示する際は画面の明るさを最大にすることを推奨します。</li>
          </ul>
        </div>
      </BrowserView>

      {/* モバイル版 - 従来のレイアウト */}
      <MobileView>
        <div className="w-full my-8 flex flex-col items-center">
          <p className="text-center text-3xl mb-1">{name}</p>
          <div className="grid place-items-center bg-white p-4">
            <QRCodeCanvas value={value} size={256} level="H" />
          </div>
          <p className="text-center text-gray-500">{value}</p>
          <p className="text-center mt-4 text-xl">{message}</p>
        </div>
        <ul className="list-disc pl-4">
          <li>このQRコードを係に見せることで入場できます。</li>
          <li>QRコードは一度しか使用できません。</li>
          <li>提示する際は画面の明るさを最大にすることを推奨します。</li>
        </ul>
      </MobileView>

      {/* QRコード拡大モーダル */}
      {isModalOpen && (
        <>
          {/* オーバーレイ */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* モーダルコンテンツ */}
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 閉じるボタン */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="閉じる"
              >
                ×
              </button>

              {/* モーダル内容 */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">{name} さん</h3>
                <div className="grid place-items-center bg-gray-50 p-4 rounded-lg mb-4">
                  <QRCodeCanvas value={value} size={280} level="H" />
                </div>
                <p className="text-gray-500 text-sm mb-4">{value}</p>
                {message && <p className="text-lg mb-4">{message}</p>}
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    閉じる
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
