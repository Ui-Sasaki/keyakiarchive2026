import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { H } from "@/ui/structures/H";

export default function ComingSoon() {
  return (
    <div className="w-full c-bg-grid">
      {/* ヘッダー */}
      <Navigation />

      {/* コンテンツ */}
      <div className="bg-container relative flex justify-center items-center py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white border-2 border-zinc-300 rounded-3xl shadow p-8 md:p-15 text-center">
          <H className="text-10xl md:text-6xl mb-6">OUT OF SERVICE</H>
          <p className="text-maintext text-lg md:text-xl mb-3">
            このページは本祭中のみ利用できます
          </p>
          <p className="text-maintext text-lg">
            
          </p>
        </div>
      </div>

      {/* フッター */}
      <Footer />
    </div>
  );
}
