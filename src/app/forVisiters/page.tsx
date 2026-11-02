"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const Footer = dynamic(() => import("@/components/Footer"));

export default function ForVisiters() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div>
      <Navigation />

      <div className="flex flex-col items-center bg-[#FFFFF8] md:bg-gradient-to-b md:from-[#6A1717] md:to-[#CE2D2D]">
        <div className="w-full bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat pb-18 md:w-265">
          <div className="mx-4 mt-13 mb-10 md:mx-8 md:mb-4">
            <div className="relative h-10">
              <NextImage
                className="absolute left-0 top-0"
                src="/forVisiters/Circles.svg"
                alt=""
                width={300}
                height={0}
              />

              <div className="absolute left-4 top-9 inline-block border border-[#CE2D2D] bg-white text-[#CE2D2D] md:left-6">
                <p className="mx-4 my-1 text-[17px] md:mx-5 md:text-xl">
                  ご来校の方へ
                </p>
              </div>
            </div>

            <div className="relative mx-0 mt-16 transition-all duration-300 drop-shadow-lg hover:scale-101 hover:drop-shadow-xl md:mx-10 md:mt-16">
              <div className="relative z-10 border border-[#CE2D2D] bg-white p-5 shadow-lg md:min-h-[263px] md:p-8">
                <p className="text-start text-[13px] leading-[1.9] md:text-[18px] md:leading-[2.2] md:tracking-[0.5px]">
                  ・在校生保護者及び教職員以外の方による写真、ビデオ等の撮影行為はご遠慮ください。
                  <br />
                  ・開場時間前後は混雑が予想されます。出来るだけ混雑する時間帯を避けてのご来校をお願いいたします。
                  <br />
                  ・アリーナ発表の鑑賞をご希望の方は
                  <Link
                    href="https://www.hiroogakuen.ed.jp/pamphlet/ki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#CE2D2D] underline hover:opacity-70"
                  >
                    こちら
                  </Link>
                  をご覧ください。
                  <br />
                  ・けやき祭の販売では、店舗によって現金のみ・キャッシュレス決済のみの対応となります。
                  <br />
                  ・利用可能なキャッシュレス決済は
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="font-bold text-[#CE2D2D] underline hover:opacity-70"
                  >
                    こちら
                  </button>
                  です。
                </p>
              </div>
            </div>
          </div>

          <div className="mx-4 mt-10 md:mx-8">
            <div className="relative h-4 md:h-4"></div>
            <div className="mx-0 mt-7 md:mx-10">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-2">
                <div className="flex min-h-[336px] w-full flex-col items-center border border-[#111E3C] bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-[1px] hover:scale-101 hover:shadow-xl md:h-84 md:w-73">
                  <span className="flex h-8 items-center bg-[#121E3C] px-[7px] text-center text-[13px] text-white md:text-base">
                    一般の方・在校生関係者の方
                  </span>

                  <NextImage
                    src="/forVisiters/一般人.svg"
                    alt=""
                    width={30}
                    height={0}
                    className="my-7"
                  />

                  <span className="text-[14px] font-bold">
                    けやき祭は
                    <span className="font-bold text-[#CE2D2D]">
                      招待チケット制
                    </span>
                    です。
                    <br />
                    チケットがないとご入場出来ませんのでご了承ください。
                    <br />
                    入場時にQRコードをご提示ください。
                  </span>
                </div>

                <div className="flex min-h-[336px] w-full flex-col items-center border border-[#111E3C] bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-[1px] hover:scale-101 hover:shadow-xl md:h-84 md:w-73">
                  <span className="flex h-8 items-center bg-[#121E3C] px-9 text-center text-white">
                    受験生の方
                  </span>

                  <NextImage
                    src="/forVisiters/受験生.svg"
                    alt=""
                    width={105}
                    height={0}
                    className="mb-4 mt-4"
                  />

                  <span className="text-[14px] font-bold">
                    2026年度のけやき祭は、
                    <span className="font-bold text-[#CE2D2D]">
                      受験生とその保護者に予約制
                    </span>
                    にて公開いたします。
                    <br />
                    受験生本人と保護者の方で
                    <span className="font-bold text-[#CE2D2D]">
                      合計3名まで
                    </span>
                    での予約制とします。
                    <span className="font-bold text-[#CE2D2D]">
                      受験生の学年制限はありません。
                    </span>
                  </span>

                  <div className="mt-3 flex w-full flex-col items-center gap-2">
                    
<div className="mt-3 flex w-full flex-col items-center gap-2">
  <p className="text-center text-[12px] font-bold text-[#CE2D2D]">
    受験生の申し込み受付は終了いたしました。
  </p>
</div>

                  </div>
                </div>

                <div className="flex min-h-[336px] w-full flex-col items-center border border-[#111E3C] bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-[1px] hover:scale-101 hover:shadow-xl md:h-84 md:w-73">
                  <span className="flex h-8 items-center bg-[#121E3C] px-2 text-center text-[13px] text-white md:text-base">
                    卒業生・卒業生保護者の方
                  </span>

                  <NextImage
                    src="/forVisiters/卒業生.svg"
                    alt=""
                    width={65}
                    height={0}
                    className="my-7"
                  />

                  <span className="text-[14px] font-bold">
                    招待チケットをお持ちでない方は、
                    <span className="font-bold text-[#CE2D2D]">
                      来校フォームまたは来校用紙
                    </span>
                    をご記入のうえ、ご来場ください。
                  </span>

                  <div className="mt-4 flex w-full flex-col items-center gap-2">
                   
<div className="mt-4 flex w-full flex-col items-center gap-2">
  <p className="text-center text-[13px] font-bold text-[#CE2D2D]">
    卒業生の来校受付は終了いたしました。
  </p>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-3 shadow-2xl md:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute right-3 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl font-bold text-gray-700 shadow-md transition hover:bg-gray-100"
              aria-label="閉じる"
            >
              ×
            </button>
            <NextImage
              src="/sales/payment.webp"
              alt="利用可能なキャッシュレス決済"
              width={1200}
              height={1600}
              className="h-auto w-full"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}