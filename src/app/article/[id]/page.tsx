import data from "@/constants/group.json";
import Image from "next/image";
import { H } from "@/ui/structures/H";
import { TransitionLink } from "@/lib/transition";

import { Metadata } from "next";

export function generateStaticParams() {
  return data.map((group) => ({
    id: String(group.id),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const groupData = data.find((group) => group.id === id);

  if (!groupData) {
    return {
      title: "団体が見つかりません",
      description: "ページが見つかりませんでした。",
      robots: {
        index: false,
      },
    };
  }

  return {
    title: groupData.name,
    description: groupData.description,
    robots: {
      index: groupData.description.length > 250,
    },
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const groupData = data.find((group) => group.id === id);

  if (!groupData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <H className="text-3xl mb-4">ページが見つかりませんでした。</H>
        <TransitionLink href="/group" className="text-blue-600 underline">
          団体一覧に戻る
        </TransitionLink>
      </div>
    );
  }

  return (
<div className="w-full flex justify-center px-2 md:px-0 pt-8 md:pt-14 pb-10 min-h-[calc(100vh-95px)]">      <div className="relative w-full max-w-2xl bg-white border-2 border-[#CE2D2D] rounded-2xl shadow-lg mt-2 overflow-hidden">
        <TransitionLink
          href="/group"
          backIfHistory
          className="absolute top-1.5 left-4 text-[#CE2D2D] text-sm px-3 py-1 rounded-full shadow hover:bg-[#f0f0f0] z-10 "
        >
          ← 団体一覧に戻る
        </TransitionLink>
        {/* Header Image */}
        <div className="w-full aspect-[4/2.2] bg-gray-100 relative flex items-center justify-center border-b-2 border-[#CE2D2D] mt-10">
          <Image
            src={groupData.image}
            alt={groupData.name}
            fill
            className="object-contain p-6 md:p-1"
            style={{
              viewTransitionName: `group-image-${groupData.id}`,
            }}
            priority
          />
        </div>
        {/* Main Content */}
        <div className="px-6 md:px-10 py-8">
          <H className="text-center text-3xl md:text-4xl font-bold text-[#CE2D2D] mb-2 tracking-tight">
            {groupData.name}
          </H>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mt-2">
            <div className="flex justify-center items-center gap-2 text-base md:text-lg text-gray-700 font-semibold">
              <span className="flex justify-center">
                <span className="inline-block text-[#CE2D2D] w-fit text-xs font-bold text-center">
                  発表場所: {groupData.location}
                </span>
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit text-xs font-bold">
                {groupData.first}
              </span>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full w-fit text-xs font-bold">
                {groupData.second}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <H className="text-xl text-gray-800 mb-2">団体紹介</H>
            <p className="text-lg md:text-xl text-gray-900 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
              {groupData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
