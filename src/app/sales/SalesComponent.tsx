"use client";

import { useState } from "react";
import ArrangeProducts from "./ArrangeProductsComponent";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import NextImage from "next/image";
import { TopTitle } from "@/components/texts";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isHirooPayEnabled: number;
  imageId: number;
  type: number;
  detail: string | null;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
}

interface FilterState {
  showAvailable: boolean;
  showHirooPay: boolean;
}

const foodLocations = [
  "全て",
  "1F カフェレストラン",
  "1F 中庭",
  "3F グラウンド (メイン)",
  "7F クッキング部",
  "その他",
];

const foodLocationTeams: Record<string, string[]> = {
  "その他": ["B1F　ボランティア部"],
  "1F カフェレストラン": ["1F カフェレストラン 後援会ブース"],
  "1F 中庭": ["1F 中庭"],
  "3F グラウンド (メイン)": ["3F グラウンド アイス", "3F グラウンド ドリンク", "3F グラウンド わたあめ", "3F グラウンド ベルギーワッフル", "3F グラウンド 唐揚げ", "3F グラウンド ホットドッグ", "3F グラウンド ポテト", "3F グラウンド 同窓会ブース", "3F グラウンド ディッピンドッツ", "3F グラウンド 焼き鳥", "3F グラウンド 油そば"],
  "7F クッキング部": ["7F　技術家庭科室"],
};

const goodsLocations = [
  "全て",
  "B1F ボランティア部",
  "1F カフェレストラン",
  "3F グラウンド",
  "5F 文芸イラスト部",
];

const goodsLocationTeams: Record<string, string[]> = {
  "B1F ボランティア部": ["B1F　ボランティア部"],
  "1F カフェレストラン": ["1F カフェレストラン 後援会ブース", "1F カフェレストラン 同窓会ブース", "1F　カフェレストラン"],
  "3F グラウンド": ["3F グラウンド 同窓会ブース"],
  "5F 文芸イラスト部": ["5F 文芸イラスト部 販売ブース"],
};

export default function SalesComponent({
  food,
  goods,
  other,
  teams,
}: {
  food: Product[];
  goods: Product[];
  other: Product[];
  teams: Team[];
}) {
  const [filters, setFilters] = useState<FilterState>({
    showAvailable: false,
    showHirooPay: false,
  });


const [selectedFoodLocation, setSelectedFoodLocation] = useState("全て");
const [selectedGoodsLocation, setSelectedGoodsLocation] = useState("全て");
const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleFilterChange = (filterType: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const filteredFood =
    selectedFoodLocation === "全て"
      ? food
      : food.filter((product) => {
          const team = teams.find((team) => team.id === product.teamId);

          if (!team) return false;

          return foodLocationTeams[selectedFoodLocation]?.includes(team.name);
        });

        const filteredGoods =
  selectedGoodsLocation === "全て"
    ? goods
    : goods.filter((product) => {
        const team = teams.find((team) => team.id === product.teamId);

        if (!team) return false;

        return goodsLocationTeams[selectedGoodsLocation]?.includes(team.name);
      });

  return (
    <div className="w-full">
      <Navigation />

      <div className="flex w-full flex-col items-center bg-[#FFFFF8] md:bg-gradient-to-b md:from-[#6A1717] md:to-[#CE2D2D]">
        <div className="relative z-10 w-full bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat pb-20 pt-16 md:max-w-[1080px] md:pt-0">
          <div className="ml-8 flex md:ml-12">
            <NextImage
              src="/sales/page/Title1.webp"
              alt="Sales Page Title"
              width={350}
              height={100}
              priority
            />
          </div>

          <TopTitle subtitle="Sales Information" className="my-5 py-3">
            販売情報
          </TopTitle>

          <div className="mb-6 flex justify-center"> <button onClick={() => setShowPaymentModal(true)} className="rounded px-3 py-2 text-base font-bold text-[#9C2A27] underline decoration-2 underline-offset-4 transition-all duration-150 hover:bg-[#9C2A27]/10 hover:text-[#7D211F] hover:decoration-[#7D211F] active:scale-95 active:bg-[#9C2A27]/15 md:text-lg" > 決済方法はこちらをクリック </button> </div>

          <div className="relative mt-0 md:mt-5">
  

            <p className="px-2 pb-2 text-center text-maintext">
              HirooPayは広尾学園生専用で
              <br />
              独自のQRコード決済システムです。
            </p><br />

            <div className="mb-6 grid grid-cols-2 justify-center gap-2 px-4 md:flex md:flex-wrap">
              <button
                onClick={() => handleFilterChange("showAvailable")}
                className={`whitespace-nowrap rounded border px-3 py-2 text-sm font-semibold transition-colors duration-150 md:px-4 ${
                  filters.showAvailable
                    ? "border-yellow-400 bg-yellow-400 text-[#453113]"
                    : "border-yellow-400 bg-white text-[#453113] hover:bg-yellow-100"
                }`}
              >
                販売中のみ表示
              </button>

              <button
                onClick={() => handleFilterChange("showHirooPay")}
                className={`whitespace-nowrap rounded border px-3 py-2 text-sm font-semibold transition-colors duration-150 md:px-4 ${
                  filters.showHirooPay
                    ? "border-yellow-400 bg-yellow-400 text-gray-800"
                    : "border-yellow-400 bg-white text-gray-800 hover:bg-yellow-100"
                }`}
              >
                HirooPay使用可のみ表示
              </button>
            </div>

            <TopTitle subtitle="Food Sales" className="mt-2 md:mt-8">
              食品販売
            </TopTitle>

            <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2 px-4">
              {foodLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedFoodLocation(location)}
                  className={`rounded-md border px-3 py-2 text-[12px] font-semibold transition-colors duration-150 md:px-5 md:text-[14px] ${
                    selectedFoodLocation === location
                      ? "border-[#9C2A27] bg-[#9C2A27] text-white"
                      : "border-[#9C2A27] bg-white text-[#9C2A27] hover:bg-[#9C2A27] hover:text-white"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>

            <div className="mx-auto my-8 max-w-6xl px-4 md:px-8">
              <ArrangeProducts
                products={filteredFood}
                teams={teams}
                filters={filters}
              />
            </div>

<TopTitle subtitle="Goods Sales" className="mt-8">
  物品販売
</TopTitle>

<div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2 px-4">
  {goodsLocations.map((location) => (
    <button
      key={location}
      onClick={() => setSelectedGoodsLocation(location)}
      className={`rounded-md border px-3 py-2 text-[12px] font-semibold transition-colors duration-150 md:px-5 md:text-[14px] ${
        selectedGoodsLocation === location
          ? "border-[#9C2A27] bg-[#9C2A27] text-white"
          : "border-[#9C2A27] bg-white text-[#9C2A27] hover:bg-[#9C2A27] hover:text-white"
      }`}
    >
      {location}
    </button>
  ))}
</div>

<div className="mx-auto my-8 max-w-6xl px-4 md:px-8">
  <ArrangeProducts
    products={filteredGoods}
    teams={teams}
    filters={filters}
  />
</div>

            <TopTitle subtitle="Other Sales" className="mt-8">
              その他の販売
            </TopTitle>

            <div className="mx-auto my-8 max-w-6xl px-4 md:px-8">
              <ArrangeProducts
                products={other}
                teams={teams}
                filters={filters}
              />
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
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute right-3 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl font-bold text-gray-700 shadow-md transition hover:bg-gray-100"
              aria-label="閉じる"
            >
              ×
            </button>

            <NextImage
              src="/sales/payment.webp"
              alt="決済方法"
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