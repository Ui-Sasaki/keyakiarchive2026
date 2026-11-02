
import { mintyou } from "../../app/fonts";

export default function News() {
  return (
    <section className="w-full bg-[#FFFFF8] md:flex md:justify-center md:bg-[#6A1717]">
      <div
        className={`${mintyou.className} w-full bg-[#FFFFF8] px-5 py-10 md:max-w-[1020px] md:px-12 md:py-14`}
      >
        <div className="mx-auto max-w-[900px]">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="whitespace-nowrap text-[28px] text-[#CE2D2D] md:text-[36px]">
              お知らせ
            </h2>

            <div className="h-px w-full bg-[#CE2D2D]" />
          </div>

          <div className="rounded-lg border border-[#CE2D2D] bg-white px-6 py-8 text-center md:px-10 md:py-10">
            <p className="mb-4 text-[20px] text-[#CE2D2D] md:text-[26px]">
              2026年度けやき祭 アーカイブサイト
            </p>

            <p className="text-[14px] leading-8 text-[#453113] md:text-[16px]">
              本サイトは、2026年度けやき祭の公式ホームページを
              <br className="hidden md:block" />
              記録として保存・公開しているアーカイブサイトです。
            </p>

            <p className="mt-4 text-[13px] leading-7 text-[#453113] md:text-[15px]">
              掲載されている情報は2026年度けやき祭開催当時のものです。
              <br className="hidden md:block" />
              アーカイブ化に伴い、ログイン機能は非表示としております。
            </p>
             <p className="mt-4 text-[13px] leading-7 text-[#453113] md:text-[15px]">
              2027年度のけやき祭のサイトは９月中旬ごろの公開を予定しております。
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
