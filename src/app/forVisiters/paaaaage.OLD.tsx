import { Navigation } from "@/components/Navigation";
import NextImage from "next/image";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"));

export default function forVisiters() {
  return (
    <div>
      <Navigation />
      <div className="bg-gradient-to-b from-[#6A1717] to-[#CE2D2D] flex flex-col items-center">
        <div className="w-265 pb-18 bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat">
          <div className="mx-8 mt-13 mb-75">
            <div className="relative h-10">
              <NextImage
                className="absolute top-0 left-0"
                src="/forVisiters/Circles.svg"
                alt=""
                width={300}
                height={0}
              />
              <div className="inline-block bg-white border-1 border-[#CE2D2D] absolute top-9 left-6 text-[#CE2D2D] text-xl">
                <p className="mx-5 my-1">来校時の諸注意</p>
              </div>
            </div>
            <div className="mt-3 mx-10 relative transition-all hover:drop-shadow-xl drop-shadow-lg duration-300 hover:scale-101">
              <NextImage
                src="/forVisiters/frame.svg"
                alt=""
                width={100}
                height={100}
                className="w-full h-auto absolute top-0 left-0"
              />
              <div className="absolute top-0 left-0 w-full h-[263px] flex flex-col justify-center items-center p-4">
                <div className="w-full h-full py-10 px-13 ">
                  <p className="text-start text-[16px] leading-[29px] bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_28px,#CE2D2D_28px,#CE2D2D_29px)] outline-none resize-none ">
                    ・在校生保護者及び教職員以外の方による写真、ビデオ等の撮影行為はご遠慮ください。
                    <br />
                    ・開場時間前後は混雑が予想されます。出来るだけ混雑する時間帯を避けてのご来校をお願いいたします。
                    <br />
                    ・アリーナ発表の鑑賞をご希望の方はこちらをご覧ください。※9月26日追加
                    <br />
                    ・けやき祭の販売では、店舗によって現金のみ・キャッシュレス決済のみの対応となります。
                    <br />
                    ・利用可能なキャッシュレス決済はこちらです。※10月4日追加
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-8 mt-10">
            <div className="relative h-18">
              <NextImage
                className="absolute top-0 left-0"
                src="/forVisiters/Circles.svg"
                alt=""
                width={300}
                height={0}
              />
              <div className="inline-block bg-white border-1 border-[#CE2D2D] absolute top-9 left-6 text-[#CE2D2D] text-xl">
                <p className="mx-5 my-1">来校時の諸注意</p>
              </div>
            </div>
            <div className="mt-7 mx-10">
              <div className="mx-0 grid grid-cols-3 gap-2">
                <div className="hover:scale-101 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-xl flex items-center p-5 w-73 h-84 bg-white border-1 border-[#111E3C] shadow-lg flex-col">
                  <span className="text-center text-white bg-[#121E3C] h-8 flex items-center px-[7px]">
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
                    けやき祭は<span className="text-[#CE2D2D] font-bold">招待チケット制</span>です。
                    <br />
                    招待チケットを受け取った方のみ
                    <br />
                    入場できます。
                    <br />
                    入場時にQRコードをご提示ください。
                  </span>
                </div>

                <div className="hover:scale-101 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-xl flex items-center py-5 px-6 w-73 h-84 bg-white border-1 border-[#111E3C] shadow-lg flex-col">
                  <span className="text-center text-white bg-[#121E3C] h-8 flex items-center px-9">
                    受験生の方
                  </span>
                  <NextImage
                    src="/forVisiters/受験生.svg"
                    alt=""
                    width={105}
                    height={0}
                    className="mt-4 mb-4"
                  />
                  <span className="text-[14px] font-bold">
                    2026年度のけやき祭は、<span className="text-[#CE2D2D] font-bold">受験生とその保護者に予約制</span>にて公開いたします。<br />
                    受験生本人と保護者の方で<span className="text-[#CE2D2D] font-bold">合計3名まで</span>での予約制とします。<span className="text-[#CE2D2D] font-bold">受験生の学年制限はありません。</span>
                  </span>
                  <button className="mt-2 group relative flex items-center justify-center gap-3 px-3 py-1 overflow-hidden rounded-full border border-neutral-900 bg-white transition-colors hover:bg-[#121E3C]">
                    {/* 左矢印: 通常は左寄り → ホバーで右(中央)へ移動 */}
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-2 text-neutral-900 group-hover:text-white">
                      {'>>>'}
                    </span>
                    <span className="text-neutral-900 transition-colors group-hover:text-white text-[13px]">
                      申し込みはこちら
                    </span>
                    {/* 右矢印: 通常は右寄り → ホバーで左(中央)へ移動 */}
                    <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2 text-neutral-900 group-hover:text-white">
                      {'<<<'}
                    </span>
                  </button>
                </div>

                <div className="hover:scale-101 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-xl flex items-center p-5 w-73 h-84 bg-white border-1 border-[#111E3C] shadow-lg flex-col">
                  <span className="text-center text-white bg-[#121E3C] h-8 flex items-center px-2">
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
                    招待チケットをお持ちでない方は、<span className="text-[#CE2D2D] font-bold">来校フォームまたは来校用紙</span>をご記入のうえ、ご来場ください。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
