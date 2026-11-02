import { H } from "@/ui/structures/H";
import { Navigation } from "@/components/Navigation";
import { ButtonAsLink } from "@/ui/buttons";

export default async function NotFound() {
  return (
    <div className={`h-full c-bg-grid`}>
      <Navigation />
      <main className="pb-8">
        <div
          className={`w-5/6 md:w-4/5 h-[35rem] max-w-7xl my-4 md:my-12 mx-auto p-5 pt-10 md:p-10 bg-white border-2 border-solid border-zinc-300 rounded-xl shadow relative`}
        >
          <div className="flex justify-center content-center items-center flex-col gap-8 h-full">
            <H className="text-center text-6xl">404 Not Found</H>
            <div className="text-center text-lg px-6">
              <p className="break-words whitespace-nowrap text-sm md:text-lg">
                お探しのページは見つかりませんでした。
              </p>
              <p className="text-sm md:text-lg">
                URLが間違っているか、ページが削除された可能性があります。
              </p>
              <ButtonAsLink href="/" className="mt-4 inline-block">
                ホームに戻る
              </ButtonAsLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
