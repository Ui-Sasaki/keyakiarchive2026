import { Text, TopTitle } from "@/components/texts";
import { jackeyFont } from "../fonts";
import { Carousel } from "./Carousel";

export default function Theme() {
  return (
    <div className="theme-container pt-16 pb-16">
      <TopTitle subtitle="Theme">テーマ</TopTitle>
      <div className="flex flex-col items-center mt-8 mb-12">
        <span className={`${jackeyFont.className} text-4xl font-bold`}>
          Sparkle
        </span>
        <section className="w-full h-auto p-8 k break-keep break-words">
          <Text>「SPARKLE」は英語で「輝く」という意味を持ち、</Text>
          <Text>広尾学園の生徒の日頃の努力が「輝く」文化祭で</Text>
          <Text>あってほしいという意味を込めました。</Text>
          <Text className="mt-4">ご来場いただいた皆様に本校の生徒の</Text>
          <Text>
            <span className="text-yellow-400">光り輝く姿</span>
            をお見せできたら幸いです。
          </Text>
        </section>
      </div>
      <TopTitle subtitle="About">けやき祭とは</TopTitle>
      <div className="flex flex-col items-center mt-8 mb-8">
        <Text>プレゼン発表、クラス表現、部活発表、物品販売</Text>
        <Text>この4種類の企画を中心にけやき祭は構成されています。</Text>
      </div>
      <Carousel />
    </div>
  );
}
