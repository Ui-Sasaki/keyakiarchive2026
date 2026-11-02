"use client";

import { H } from "@/ui/structures/H";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useCallback, useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { mintyou } from "../fonts";
import Link from "next/link";
import Image from "next/image";

// ボタンのコンポーネント化（単一化）
const SlideButton = memo(function SlideButton({
  href,
  children,
  isSpecial = false,
}: {
  href: string;
  children: React.ReactNode;
  isSpecial?: boolean;
}) {
  const className = isSpecial
    ? "mx-auto mt-3 mb-2 block w-fit whitespace-nowrap rounded-full bg-yellow-300 px-3 py-1.5 text-xs text-maintext hover:bg-yellow-200 md:mt-8 md:px-4 md:py-2 md:text-sm"
    : "mx-auto mt-3 mb-2 block w-fit rounded-full bg-yellow-300 px-4 py-1.5 text-xs text-maintext hover:bg-yellow-200 md:mt-8 md:px-4 md:py-2 md:text-base";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
});

const slides = [
  {
    src: "/home/presentation.webp",
    title: "プレゼン発表",
    text: "けやき祭では、全生徒が各自興味のある分野を調べ、来場者の方にプレゼンを行います。",
    href: "/group?category=プレゼン発表",
    linkLabel: "プレゼンを検索 ▶︎",
  },
  {
    src: "/home/expression.webp",
    title: "クラス表現",
    text: "けやき祭では、高校の各クラスが、生徒が企画から準備まで手掛けた出し物を披露します。",
    href: "/group",
    linkLabel: "クラス紹介を見る ▶︎",
  },
  {
    src: "/home/club.webp",
    title: "団体・部活発表",
    titleClassName: "text-lg md:text-[25px]",
    text: "文武両道を掲げる広尾学園の団体と部活動。アリーナを中心に、各団体や部活動の発表が行われます。",
    href: "/table",
    linkLabel: "タイムテーブルを見る ▶︎",
  },
  {
    src: "/home/gears.webp",
    title: "食品販売",
    text: "食品販売は、生徒が企画・販売まで行います。グラウンド等に多くの店舗が並びますので、ぜひお立ち寄りください。",
    href: "/sales",
    linkLabel: "メニューを見る ▶︎",
  },
];

export const Carousel = memo(function Carousel() {
  const [embraRef, embraApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (embraApi) embraApi.scrollPrev();
  }, [embraApi]);

  const handleNext = useCallback(() => {
    if (embraApi) embraApi.scrollNext();
  }, [embraApi]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (embraApi) embraApi.scrollTo(index);
    },
    [embraApi]
  );

  useEffect(() => {
    if (!embraApi) return;

    const onSelect = () => {
      setSelectedIndex(embraApi.selectedScrollSnap());
    };

    onSelect();
    embraApi.on("select", onSelect);

    const autoplayInterval = setInterval(() => {
      if (embraApi.canScrollNext()) {
        embraApi.scrollNext();
      }
    }, 7000);

    return () => {
      embraApi.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [embraApi]);

  return (
    <section
      className={`${mintyou.className} relative w-full bg-[#FFFFF8] md:bg-transparent`}
    >
      <div className="relative mx-auto h-auto w-full max-w-[390px] overflow-hidden bg-[#FFFFF8] pb-6 md:max-w-none md:overflow-visible md:bg-transparent md:mt-28 md:pb-0">
        
        <Image
          src="/_pic/phone-carousel.svg"
          alt=""
          width={390}
          height={880}
          className="absolute left-0 top-0 h-full w-full object-cover md:hidden"
        />

        <Image
          src="/_pic/Frame3.svg"
          alt=""
          width={900}
          height={550}
          className="absolute left-1/2 top-[-320px] z-0 hidden -translate-x-1/2 md:block"
        />

        <Image
          src="/_pic/circles.webp"
          alt=""
          width={390}
          height={350}
          className="absolute left-0 top-[-280px] mt-6 hidden w-[390px] md:block"
        />

          <div className="absolute left-[28px] top-[48px] z-20 border border-red-500 bg-[#FFFFF8] px-5 py-1 text-[24px] text-red-600 md:left-[130px] md:top-[-178px] md:px-5 md:py-2 md:text-3xl md:mt-6">
            けやき祭とは
          </div>

          <div className="relative pt-[110px] md:relative md:left-auto md:top-auto md:w-auto md:translate-x-0 md:-translate-y-6 md:pt-0">
            <div className="relative">
              <div
                className="mx-auto w-[340px] overflow-hidden md:w-[48rem] md:max-w-[48rem]"
                ref={embraRef}
              >
                <div className="flex items-start">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.title}
                      className="flex flex-[0_0_100%] flex-col border border-maintext bg-white md:h-[30rem] md:flex-row md:bg-transparent"
                    >
                      <div className="relative h-[200px] shrink-0 md:h-auto md:grow">
                        <Image
                          src={slide.src}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 340px, 500px"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>

                      <div className="flex flex-col justify-between bg-white px-4 py-3 text-maintext md:w-56 md:shrink-0 md:px-0 md:py-6">
                        <div>
                          <H
                            className={`${mintyou.className} mb-3 text-xl font-bold md:mb-4 md:px-4 md:text-3xl ${
                              slide.titleClassName ?? ""
                            }`}
                          >
                            {slide.title}
                          </H>
                          <p className="text-sm leading-6 md:px-4 md:text-lg md:leading-7">
                            {slide.text}
                          </p>
                        </div>

                        <SlideButton
                          href={slide.href}
                          isSpecial={slide.title === "団体・部活発表"}
                        >
                          {slide.linkLabel}
                        </SlideButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePrev}
                className="absolute left-[-14px] top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#B52A2A] shadow-md transition-all md:left-[-4.5rem] md:ml-32 md:rounded-full md:bg-white md:p-2 md:shadow-lg"
                aria-label="前へ"
              >
                <GrPrevious className="h-6 w-6 md:h-8 md:w-8" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-[-14px] top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#B52A2A] shadow-md transition-all md:right-[-4.5rem] md:mr-32 md:rounded-full md:bg-white md:p-2 md:shadow-lg"
                aria-label="次へ"
              >
                <GrNext className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-2 md:mt-8 md:mb-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === selectedIndex ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`スライド ${index + 1} へ移動`}
                />
              ))}
            </div>
          </div>
        </div>

      <div className="relative mt-0 md:mt-[100px]">
      </div>
    </section>
  );
});