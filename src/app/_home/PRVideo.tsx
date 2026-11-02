import { TopTitle, Text } from "@/components/texts";
import { Suspense } from "react";
import { SiteInfo } from "@prisma/client";

export default function PRVideo({ info: _info }: { info: SiteInfo }) {
  return (
    <div className="pt-16 pb-12 mx-10">
      <TopTitle subtitle="Video">PR動画</TopTitle>
      <Text className="text-center mt-6 text-xl">
        著作権の都合上、動画は開会式のものとは異なっております。
      </Text>
      <div className="flex justify-center items-center">
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <video
            src="/home/keyaki-pv.mp4"
            width={640}
            height={360}
            controls
            preload="none"
            className="centered-video mt-8 rounded-lg shadow-l flex justify-center"
          />
        </Suspense>
      </div>
    </div>
  );
}
