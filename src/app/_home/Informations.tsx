import { mintyou } from "../../app/fonts";
import Image from "next/image";
import Link from "next/link";
import Presentation from "./Presentation";

export default function Informations() {
  return (
    <section className="w-full">
      <div className="flex w-full justify-center">
        <div
          className={`${mintyou.className} relative min-h-[520px] w-full overflow-hidden bg-[#FFFFF8] shadow-lg md:min-h-[450px] md:max-w-[1020px] md:border md:border-red-400`}
        >
          <div className="relative mx-auto w-full max-w-[390px] md:w-[900px] md:max-w-none">
            <Image
              src="/_pic/phone-info.svg"
              alt=""
              width={390}
              height={844}
              className="block h-auto w-full md:hidden"
            />

            <Image
              src="/_pic/Frame1.svg"
              alt="Information"
              width={900}
              height={250}
              className="hidden h-auto w-full md:block"
            />

            <Image
              src="/_pic/circles.webp"
              alt="Circles"
              width={380}
              height={350}
              className="absolute left-0 top-[40px] hidden w-[380px] md:block"
            />

            <Image
              src="/_pic/red.webp"
              alt=""
              width={160}
              height={350}
              className="absolute right-[264px] top-[60px] hidden w-[160px] md:block"
            />

            <Image
              src="/_pic/red.webp"
              alt=""
              width={180}
              height={350}
              className="absolute left-[252px] top-[590px] hidden w-[180px] md:block"
            />

            <Image
              src="/_pic/white.webp"
              alt=""
              width={160}
              height={350}
              className="absolute left-[32px] top-[370px] hidden w-[160px] md:block"
            />
            <Image
              src="/_pic/phrame.webp"
              alt="Pamphlet"
              width={190}
              height={150}
              className="absolute right-[-10px] top-[80px] z-10 h-auto w-[180px] md:left-auto md:right-[20px] md:top-[120px] md:w-[230px] md:rotate-0"
            />

                        <Link
              href="https://www.hiroogakuen.ed.jp/pamphlet/kp/"
              target="_blank"
              rel="noreferrer"
              className="group absolute left-[10px] top-[240px] z-20 block w-[280px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE2D2D] focus-visible:ring-offset-2 md:left-[100px] md:top-[250px] md:w-[550px]"
              aria-label="2026年度パンフレットを開く"
            >
              <Image
                src="/_pic/pamphlet.svg"
                alt="2026年度パンフレット"
                width={190}
                height={150}
                className="h-auto w-full"
              />
              <span className="absolute bottom-[1%] right-[1%] flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 shadow-[0_4px_0_#8f1d1d] transition duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_8px_0_#8f1d1d] group-active:translate-y-1 group-active:shadow-none md:h-20 md:w-20 md:p-4">
                <Image
                  src="/_pic/pamphlet_click.webp"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="relative -mt-[540px]">
                <Presentation />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:hidden">
        <Presentation />
      </div>
    </section>
  );
}
