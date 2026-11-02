
"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { mintyou } from "../fonts";

const B1Floormap = "/map/B1Fmap.webp";
const F1Floormap = "/map/1Fmap.webp";
const F2Floormap = "/map/2Fmap.webp";
const F3Floormap = "/map/3Fmap.webp";
const F5Floormap = "/map/5Fmap.webp";
const F6Floormap = "/map/6Fmap.webp";
const F7Floormap = "/map/7Fmap.webp";
const F8Floormap = "/map/8Fmap.webp";
const F9Floormap = "/map/9Fmap.webp";

const floors = [
  {
    name: "B1F",
    map: B1Floormap,
    locations: [0, 1],
  },
  {
    name: "1F",
    map: F1Floormap,
    locations: [2, 3],
  },
  {
    name: "2F",
    map: F2Floormap,
    locations: [4],
  },
  {
    name: "3F",
    map: F3Floormap,
    locations: [5, 6],
  },
  {
    name: "5F",
    map: F5Floormap,
    locations: [7],
  },
  {
    name: "6F",
    map: F6Floormap,
    locations: [8],
  },
  {
    name: "7F",
    map: F7Floormap,
    locations: [9],
  },
  {
    name: "8F",
    map: F8Floormap,
    locations: [10],
  },
  {
    name: "9F",
    map: F9Floormap,
    locations: [11],
  },
];

export default function MapComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState("B1F");


  const currentFloor = floors.find(
    (floor) => floor.name === selectedFloor,
  );

  return (
    <div className={`${mintyou.className} w-full`}>
      <section className="w-full bg-[#FFFFF8] md:bg-gradient-to-b md:from-[#6A1717] md:via-[#7A1E1E] md:to-[#8F2424]">
        <div className="relative mx-auto w-full overflow-hidden bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat pb-16 md:max-w-[1020px]">
          <div className="absolute left-[45px] top-[65px] hidden gap-2 md:flex">
            <div className="h-14 w-14 rounded-full bg-[#CE2D2D]" />
            <div className="h-14 w-14 rounded-full bg-[#CE2D2D]" />
            <div className="h-14 w-14 rounded-full bg-[#CE2D2D]" />
            <div className="h-14 w-14 rounded-full bg-[#CE2D2D]" />
            <div className="h-14 w-14 rounded-full bg-[#CE2D2D]" />
          </div>

          <div className="relative z-10 px-5 pt-16 md:px-20 md:pt-24">
            <div className="mb-7">
              <span className="inline-block border border-[#CE2D2D] bg-[#FFFFF8] px-4 py-2 text-[22px] text-[#CE2D2D] md:text-[28px]">
                校内マップ
              </span>
            </div>


            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {floors.map((floor) => (
                <button
                  key={floor.name}
                  onClick={() => setSelectedFloor(floor.name)}
                  className={`min-w-[62px] rounded-md border px-4 py-2 text-[13px] transition-colors duration-150 ${
                    selectedFloor === floor.name
                      ? "border-[#A92323] bg-[#A92323] text-white"
                      : "border-[#A92323] bg-[#FFFFF8] text-[#A92323] hover:bg-[#A92323] hover:text-white"
                  }`}
                >
                  {floor.name}
                </button>
              ))}
            </div>

            {currentFloor && (
              <div>
                <div className="relative w-full overflow-hidden border-2 border-[#CE2D2D] bg-white">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={currentFloor.map}
                      alt={`${currentFloor.name} floor map`}
                      fill
                      className="cursor-pointer object-contain p-2 md:p-4"
                      onClick={() => setSelectedImage(currentFloor.map)}
                    />
                  </div>
                </div>

          
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative h-[80%] w-[90%] max-w-[1200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="拡大画像"
              fill
              className="bg-white object-contain"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#A92323] text-xl text-white"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
