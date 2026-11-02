import React from "react";

type GaugeProps = {
  congestion: number;
};

const Gauge = ({ congestion }: GaugeProps) => {
  const getColor = (index: number) => {
    if (index <= congestion) {
      if (index === 0) return "bg-cyan-300";
      if (index === 1) return "bg-lime-400";
      if (index === 2) return "bg-yellow-300";
      if (index === 3) return "bg-amber-400";
      if (index === 4) return "bg-orange-600";
    }

    return "bg-gray-200";
  };

  return (
    <div className="mx-auto flex w-full max-w-[260px] gap-2">
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={`h-5 flex-1 ${getColor(index)}`}
        />
      ))}
    </div>
  );
};

interface CongestionCardProps {
  location: string;
  congestion: number;
  createdAt: Date | null;
  condition: { [key: number]: string };
  minutesAgo: number | null;
}

const CongestionCard: React.FC<CongestionCardProps> = ({
  location,
  congestion,
  condition,
  minutesAgo,
}) => {
  return (
    <div className="w-full px-4 py-5 text-[#CE2D2D]">
      <p className="mb-2 text-center text-[20px] md:text-[23px]">
        {location} 混雑度
      </p>

      <p className="mb-4 text-center text-[27px] md:text-[32px]">
        {condition[congestion]}
      </p>
      <Gauge congestion={congestion} />

      {minutesAgo !== null && (
        <p className="mt-3 text-center text-[12px] text-[#453113] md:text-[13px]">
          {minutesAgo === 0 ? "たった今" : `${minutesAgo}分前`}更新
        </p>
      )}

      {minutesAgo !== null && minutesAgo > 10 && (
        <p className="mt-1 text-center text-[12px] font-bold text-red-500">
          10分以上未更新
        </p>
      )}
    </div>
  );
};

export default CongestionCard;