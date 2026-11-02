import Image from "next/image";

export default function Page() {
  return (
    <section className="w-full bg-[#FFFFF8] md:bg-[#6A1717]">
      <div className="relative mx-auto min-h-screen w-full bg-[#FFFFF8] bg-[url('/sales/page/background.svg')] bg-[length:1400px] bg-repeat px-5 py-16 md:max-w-[1200px] md:px-8 md:py-20">
       <div className="absolute top-9 left-6 inline-block border border-[#CE2D2D] bg-white px-8 py-3 text-[#CE2D2D]">
  <p className="text-[15px] font-bold md:text-[25px]">
    タイムテーブル
  </p>
</div>

<div className="mt-4 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
            <div className="relative h-[650px] w-full overflow-hidden">
            <Image
              src="/table/table1.webp"
              alt="Table 1"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative h-[650px] w-full overflow-hidden">
            <Image
              src="/table/table2.webp"
              alt="Table 2"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}