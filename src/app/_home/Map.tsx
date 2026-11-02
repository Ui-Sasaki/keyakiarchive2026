import { mintyou } from "../../app/fonts";
import GoogleMap from "./GoogleMap";
import Image from "next/image";

export default function Map() {
  return (
    <section
      className={`${mintyou.className} relative bg-[#FFFFF8] md:bg-transparent`}
    >
      {/* スマホ表示エリア */}
      <div className="relative mx-auto h-[630px] w-full max-w-[390px] overflow-hidden md:hidden">
        {/* 背景画像は位置固定 */}
        <Image
          src="/_pic/phone-map.svg"
          alt=""
          width={390}
          height={630}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />

        <div className="relative top-[20px]">
        {/* 「アクセス」の枠*/}
        <div className="absolute left-[48px] top-[40px] border border-red-500 bg-[#FFFFF8] px-8 py-1 text-[28px] text-red-600">
          アクセス
        </div>

        {/* Mapとテキストのコンテンツ */}
        <div className="absolute left-1/2 top-[110px] flex w-[300px] -translate-x-1/2 flex-col">
          <div className="h-[200px] overflow-hidden border border-red-400 bg-[#FFFFF8]">
            <GoogleMap />
          </div>

          <div className="border border-t-0 border-red-400 bg-[#FFFFF8] px-5 py-4 text-[14px] leading-[1.3] text-red-700">
            <div className="mb-2">
              <p>〒106-0047 東京都港区南麻布5-1-14</p>
            </div>

            <div className="mb-3">
              <p>・電車をご利用の場合</p>
              <p>東京メトロ日比谷線 広尾駅下車</p>
              <p>4番出口すぐ</p>
            </div>

            <div>
              <p>・バスをご利用の場合</p>
              <p>都営バス「品97」品川駅前–新宿駅西口</p>
              <p>都営バス「黒77」目黒駅前–千駄ヶ谷駅前</p>
              <p>日赤医療センター下・広尾学園前下車すぐ</p>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- PC ---------------- */}
      <div className="hidden md:block md:mt-20">
        <Image
          src="/_pic/Frame4.svg"
          alt="Frame4"
          width={900}
          height={700}
          className="absolute left-[-6px] top-[-150px] z-0"
        />

        <Image
          src="/_pic/circles.webp"
          alt="Circles"
          width={390}
          height={350}
          className="absolute top-[-110px]"
        />

        <div className="absolute left-[151px] top-[-8px]">
          <div className="border border-red-500 bg-[#FFFFF8] px-5 py-2 text-3xl text-red-600">
            アクセス
          </div>
        </div>

        <Image
          src="/_pic/red.webp"
          alt="red"
          width={150}
          height={350}
          className="absolute right-[370px] top-[-10px] z-50"
        />

        <Image
          src="/_pic/white.webp"
          alt="white"
          width={120}
          height={350}
          className="absolute left-[-26px] top-[365px] z-50"
        />

        <div className="relative z-10 min-h-[480px]">
          <div className="absolute left-[35px] top-[65px] h-[360px] w-[405px] overflow-hidden border border-red-400 bg-[#FFFFF8]">
            <GoogleMap />
          </div>

          <div className="absolute right-[40px] top-[65px] h-[360px] w-[405px] overflow-hidden border border-red-400 bg-[#FFFFF8] px-7 py-11 text-red-700">
            <div className="mb-7 text-lg">
              <p>〒106-0047 東京都港区南麻布5-1-14</p>
            </div>

            <div className="mb-6 text-lg leading-tight">
              <p>・電車をご利用の場合</p>
              <p>東京メトロ日比谷線 広尾駅下車</p>
              <p>4番出口すぐ</p>
            </div>

            <div className="text-lg leading-tight">
              <p>・バスをご利用の場合</p>
              <p>都営バス「品97」品川駅前–新宿駅西口</p>
              <p>都営バス「黒77」目黒駅前–千駄ヶ谷駅前</p>
              <p>日赤医療センター下・広尾学園前下車すぐ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}