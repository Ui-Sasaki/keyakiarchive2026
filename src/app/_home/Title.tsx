import Image from "next/image";
import { mintyou } from "../../app/fonts";

export default function Title() {
  return (
    <div className="relative w-full min-h-[500px] overflow-hidden px-4 pt-8 md:min-h-[calc(100vh-100px)] md:px-12 md:pt-16">
      <div className="relative flex items-start gap-4 md:gap-8 md:-top-[55px]">
        <h2 className="relative left-0 top-10 text-[70px] leading-none text-[#D62A2A] font-serif md:left-[65px] md:top-[35px] md:text-[96px]">
          燈灯
        </h2>

        <div className="relative z-10 right-6 top-9 ml-2 pt-4 text-[#D62A2A] md:ml-14  md:top-[10px]">
          <p className="text-[18px] md:text-[22px]">10.3(Sat.)10:00-15:30</p>
          <p className="text-[18px] md:text-[22px]">10.4(Sun.)10:00-15:00</p>
          <p className="hidden mt-1 text-[20px] md:block md:text-[27px]">
            広尾学園中学校高等学校
          </p>
        </div>
      </div>

      <h1 className="absolute top-100 right-1 text-[60px] font-serif tracking-[0.15em] text-transparent [-webkit-text-stroke:1px_#D62A2A] md:left-[10px] md:bottom-[-50px] md:text-[190px] md:tracking-[0.2em]">
        AKARI
      </h1>

      <Image
        src="/home/tree.svg"
        alt="Keyaki Tree"
        width={280}
        height={310}
        className="absolute z-0 right-[2px] top-[130px] w-[170px] object-contain md:left-[155px] md:top-[208px] md:w-[280px]"
      />
      

      <div className="relative mt-10 ml-0 w-[290px] bg-[#D62A2A] px-6 py-2 md:-mt-12 md:ml-6 md:w-[550px] md:px-[60px]">
        <h1
          className={`${mintyou.className} text-[58px] leading-none font-light text-white md:text-[102px]`}
        >
          けやき祭
        </h1>
      </div>
      
      <Image
        src="/_pic/phone.webp"
        alt=""
        width={390}
        height={844}
        className="absolute right-0 -top-20 z-0 w-full md:hidden"
      />

      <Image
        src="/phone_pic/circle.svg"
        alt=""
        width={120}
        height={44}
        className="absolute -left-7 top-65 z-0 md:hidden"
      />

      <Image
        src="/_pic/red.webp"
        alt=""
        width={80}
        height={24}
        className="absolute left-22 top-101 z-0 md:hidden"
      />

      <Image
        src="/home/Frame 13.svg"
        alt=""
        width={700}
        height={600}
        className="absolute right-0 top-0 z-0 hidden md:block md:w-[700px]"
      />

      <div className="absolute right-1 top-5 z-20 w-[410px] text-right md:right-[40px] md:top-[30px] md:w-auto">
        <h2 className="font-serif text-[15px] leading-tight text-[#D62A2A] md:text-[26px]">
          HIROOGAKUEN JUNIOR AND SENIOR HIGH SCHOOL
          <br />
          KEYAKI FESTIVAL
        </h2>
      </div>

<Image
  src="/home/school.svg"
  alt="School"
  width={565}
  height={550}
  className="absolute left-[85px] top-[220px] z-10 w-[190px] md:hidden"
/>

<Image
  src="/home/school.svg"
  alt="School"
  width={565}
  height={550}
  className="absolute right-[50px] top-[70px] z-10 hidden md:block"
/>
    </div>
  );
}
