"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

type PresentationStatistics = {
  total: {
    users: number;
    registered: number;
    unregistered: number;
    presentations: number;
    groupMembers: number;
  };
  byGrade: Array<{
    grade: number | null;
    total: number;
    registered: number;
    unregistered: number;
  }>;
  byClass: Array<{
    grade: number | null;
    class: number | null;
    total: number;
    registered: number;
    unregistered: number;
  }>;
};

interface PresentationChartsProps {
  statistics: PresentationStatistics;
}

const PresentationCharts: React.FC<PresentationChartsProps> = ({
  statistics,
}) => {
  // 全体統計用ドーナツチャート
  const overallData = {
    labels: ["登録済み", "未登録"],
    datasets: [
      {
        data: [statistics.total.registered, statistics.total.unregistered],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const overallOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: `全体の登録状況 (総数: ${statistics.total.users}人)`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = (
              (Number(value) / statistics.total.users) *
              100
            ).toFixed(1);
            return `${label}: ${value}人 (${percentage}%)`;
          },
        },
      },
    },
  };

  // 学年別統計用バーチャート
  const gradeData = {
    labels: statistics.byGrade.map((item) => `${item.grade}年`),
    datasets: [
      {
        label: "登録済み",
        data: statistics.byGrade.map((item) => item.registered),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
      {
        label: "未登録",
        data: statistics.byGrade.map((item) => item.unregistered),
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  const gradeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "学年別プレゼン登録状況",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context: TooltipItem<"bar">) {
            const dataIndex = context.dataIndex;
            const total = statistics.byGrade[dataIndex].total;
            const percentage = ((Number(context.raw) / total) * 100).toFixed(1);
            return `全体の${percentage}% (${total}人中)`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  // クラス別統計用バーチャート（学年別に分けて表示）
  const gradeClassData = statistics.byGrade.map((grade) => ({
    grade: grade.grade,
    classes: statistics.byClass.filter((item) => item.grade === grade.grade),
  }));

  return (
    <div className="space-y-8">
      {/* 全体統計 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64">
            <Doughnut data={overallData} options={overallOptions} />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              統計サマリー
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">総ユーザー数:</span>
                <span className="font-semibold text-gray-800">
                  {statistics.total.users}人
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">登録済み:</span>
                <span className="font-semibold text-green-800">
                  {statistics.total.registered}人
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-700">未登録:</span>
                <span className="font-semibold text-red-800">
                  {statistics.total.unregistered}人
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">個人プレゼン:</span>
                <span className="font-semibold text-blue-800">
                  {statistics.total.presentations}件
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700">グループメンバー:</span>
                <span className="font-semibold text-purple-800">
                  {statistics.total.groupMembers}人
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学年別統計 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="h-80">
          <Bar data={gradeData} options={gradeOptions} />
        </div>
      </div>

      {/* クラス別統計 */}
      {gradeClassData.map(
        (gradeInfo) =>
          gradeInfo.classes.length > 0 && (
            <div
              key={gradeInfo.grade}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {gradeInfo.grade}年クラス別登録状況
              </h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: gradeInfo.classes.map((item) => `${item.class}組`),
                    datasets: [
                      {
                        label: "登録済み",
                        data: gradeInfo.classes.map((item) => item.registered),
                        backgroundColor: "rgba(34, 197, 94, 0.8)",
                        borderColor: "rgba(34, 197, 94, 1)",
                        borderWidth: 1,
                      },
                      {
                        label: "未登録",
                        data: gradeInfo.classes.map(
                          (item) => item.unregistered,
                        ),
                        backgroundColor: "rgba(239, 68, 68, 0.8)",
                        borderColor: "rgba(239, 68, 68, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      tooltip: {
                        callbacks: {
                          afterLabel: function (context: TooltipItem<"bar">) {
                            const dataIndex = context.dataIndex;
                            const total = gradeInfo.classes[dataIndex].total;
                            const percentage = (
                              (Number(context.raw) / total) *
                              100
                            ).toFixed(1);
                            return `クラス全体の${percentage}% (${total}人中)`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default PresentationCharts;
