import { Text, TopTitle } from "@/components/texts";
import { LuMapPin } from "react-icons/lu";

export default function Access() {
  return (
    <div className="pt-16 pb-22">
      <TopTitle subtitle="Access">アクセス</TopTitle>
      <div className="md:flex space-y-4 md:space-y-0 mx-10 items-center justify-center mt-12 gap-8">
        <div className="flex flex-col md:items-start item-center justify-center">
          <Text className="inline-flex items-center font-medium justify-center">
            <LuMapPin /> 〒106-0047
          </Text>
          <Text className="font-medium mb-4">東京都港区南麻布5-1-14</Text>
          <Text className="font-medium">●電車をご利用の場合</Text>
          <Text className="font-medium">東京メトロ日比谷線 広尾駅下車</Text>
          <Text className="font-medium mb-4">4番出口すぐ</Text>
          <Text className="font-medium">●バスをご利用の場合</Text>
          <Text className="font-medium">[品97] 品川駅前-新宿駅西口</Text>
          <Text className="font-medium">[黒77] 目黒駅前-千駄ヶ谷駅前</Text>
          <Text className="font-medium">
            日赤医療センター下・広尾学園前下車すぐ
          </Text>
        </div>
      </div>
    </div>
  );
}
