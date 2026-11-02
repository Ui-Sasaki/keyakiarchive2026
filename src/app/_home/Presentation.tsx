import { mintyou } from "../../app/fonts";
import Image from "next/image";
import { Carousel } from "./Carousel";

export default function Presentation() {
  return (
    <section
      className={`${mintyou.className} relative w-full min-h-[880px] md:min-h-[450px]`}
    >
      <div className="relative mx-auto h-[480px] w-full max-w-[490px] overflow-hidden bg-[#FFFFF8] md:hidden">
        {" "}
        <Image
          src="/_pic/phone-theme.svg"
          alt=""
          width={390}
          height={880}
          className="absolute left-0 top-0 h-auto w-full"
        />
        <div className="relative -top-[20px]">
        <div className="absolute left-[45px] top-[65px] border border-red-500 bg-[#FFFFF8] px-7 py-1 text-[28px] text-red-600">
          テーマ
        </div>
        </div>
        <Image
          src="/_pic/logo.webp"
          alt="logo"
          width={420}
          height={650}
          className="absolute left-[55px] top-[124px] w-[300px]"
        />
        <Image
          src="/_pic/words.webp"
          alt="words"
          width={430}
          height={650}
          className="absolute left-[70px] top-[270px] w-[265px]"
        />
      </div>

      <div className="relative mx-auto hidden w-[900px] md:block">
        <Image
          src="/_pic/Frame2.svg"
          alt="Presentation"
          width={700}
          height={250}
          className="h-auto w-full"
        />
      </div>

      <Image
        src="/_pic/circles.webp"
        alt="Circles"
        width={390}
        height={350}
        className="absolute top-[305px] hidden md:block"
      />

      <Image
        src="/_pic/white2.webp"
        alt="white2"
        width={150}
        height={350}
        className="absolute right-[65px] top-[293px] hidden md:block"
      />

      <Image
        src="/_pic/red.webp"
        alt="red"
        width={150}
        height={650}
        className="absolute left-[37px] top-[793px] hidden md:block"
      />

      <Image
        src="/_pic/logo.webp"
        alt="logo"
        width={420}
        height={650}
        className="absolute left-[240px] top-[490px] hidden md:block"
      />

      <Image
        src="/_pic/words.webp"
        alt="logo"
        width={430}
        height={650}
        className="absolute left-[240px] top-[690px] hidden md:block"
      />

      <div className="absolute left-[167px] top-[405px] hidden md:block">
        <div className="border border-red-500 bg-[#FFFFF8] px-5 py-2 text-3xl text-red-600">
          テーマ
        </div>
      </div>

      <div className="relative hidden -mt-[200px] md:block">
        <Carousel />
      </div>

      <div className="relative w-full md:hidden">
        <Carousel />
      </div>
    </section>
  );
}
