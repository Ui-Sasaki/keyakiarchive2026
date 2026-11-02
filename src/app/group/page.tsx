"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import data from "@/constants/group.json";
import { TransitionLink } from "@/lib/transition";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("全て");
  const [selectedFloor, setSelectedFloor] = useState("全て");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "プレゼン発表":
        return "bg-red-500 text-white";
      case "クラス表現":
        return "bg-purple-500 text-white";
      case "研究発表":
        return "bg-blue-500 text-white";
      case "部活動":
        return "bg-green-500 text-white";
      case "その他":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const categories = [
    "全て",
    "プレゼン発表",
    "クラス表現",
    "研究発表",
    "部活動",
    "その他",
  ];

  const floors = ["全て", "B1", "1", "2", "3", "5", "6", "7", "8", "9"];

  const filteredData = data.filter((item) => {
    const itemCategories = item.category
      .split(",")
      .map((category) => category.trim());

    const matchesCategory =
      selectedCategory === "全て" ||
      itemCategories.includes(selectedCategory);

    const itemFloors = item.floor
      .split(",")
      .map((floor) => floor.trim());

    const matchesFloor =
      selectedFloor === "全て" ||
      itemFloors.includes(selectedFloor);

    return matchesCategory && matchesFloor;
  });

  return (
    <div className="min-h-screen w-full m-0 p-0">
      <div className="w-full">
        <div className="rounded-lg shadow-sm px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-4 py-2 rounded border text-xs md:text-sm transition-colors duration-150 font-semibold whitespace-nowrap
                  ${
                    selectedCategory === category
                      ? "bg-[#9C2A27] text-white border-[#9C2A27]"
                      : "bg-white text-[#9C2A27] border-[#9C2A27] hover:bg-[#a04641] hover:text-white"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-5 md:flex md:flex-wrap gap-x-1 gap-y-1 mb-6 justify-center">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-1 md:px-4 py-0 md:py-2 rounded-lg md:rounded border-3 md:border text-sm transition-colors duration-150 font-medium md:font-semibold whitespace-nowrap
                  ${
                    selectedFloor === floor
                      ? "bg-[#9C2A27] text-xs md:text-sm text-white border-[#9C2A27]"
                      : "bg-white text-[#9C2A27] md:text-[#453113] border-[#9C2A27] hover:bg-[#a04641] hover:text-white"
                  }
                `}
              >
                {floor === "全て" ? "全て" : `${floor}F`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            {filteredData.map((group) => (
              <TransitionLink
                key={group.id}
                href={`/article/${group.id}`}
                className="bg-white border border-gray-100 rounded-lg not-md:w-40 w-full overflow-hidden shadow-md hover:shadow-xl hover:scale-102 duration-300 transition-all cursor-pointer block"
              >
                <div className="aspect-[4/3] bg-white relative">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-contain"
                    style={{
                      viewTransitionName: `group-image-${group.id}`,
                    }}
                  />
                </div>

                <div className="p-2 md:p-4">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {group.category
                      .split(",")
                      .map((category) => category.trim())
                      .map((category) => (
                        <span
                          key={category}
                          className={`inline-block px-2 py-1 rounded text-xs ${getCategoryColor(
                            category,
                          )}`}
                        >
                          {category}
                        </span>
                      ))}
                  </div>

                  <h3 className="font-bold text-sm md:text-lg mb-3">
                    {group.name}
                  </h3>

                  <div className="text-xs md:text-sm text-gray-600 space-y-1">
                    <p>場所: {group.location}</p>
                    <p>内容: {group.content}</p>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                該当する団体が見つかりません。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;