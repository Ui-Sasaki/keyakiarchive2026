"use client";
import { Button } from "@/ui";
import { GENRES, GENRES_ICON, LOCATION_DATA } from "@/constants/presentation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import {
  processElasticHighlight,
  highlightText,
  sanitizeText,
} from "@/lib/highlight";

export interface PresentationFrameType {
  id: string;
  //userId: string;
  title: string;
  firstDayLocation: number;
  secondDayLocation: number;
  firstDay: number;
  secondDay: number;
  genre: number[];
  detail: string | null;
  _highlights?: {
    title?: string[];
    detail?: string[];
  };
}

export default function PresentationFrame({
  data,
  hFull = false,
  searchKeyword = "",
}: {
  data: PresentationFrameType;
  hFull?: boolean;
  searchKeyword?: string;
}) {
  const [items, setItems] = useState<PresentationFrameType[]>([]);

  const returnGenre = (genreIds: number[]) => {
    return genreIds.map((id) => {
      const Icon = GENRES_ICON[id as keyof typeof GENRES_ICON];
      return (
        <div
          key={id}
          className="flex items-center rounded-full bg-yellow-100 border border-yellow-300 px-3 py-2 w-fit gap-2"
        >
          <Icon size={24} />
          <span className="">{GENRES[id as keyof typeof GENRES]}</span>
        </div>
      );
    });
  };

  const addBookmark = async (
    id: string,
    title: string,
    firstDayLocation: number,
    secondDayLocation: number,
    firstDay: number,
    secondDay: number,
    genre: number[],
    detail: string | null,
  ) => {
    savePresentation(
      id,
      title,
      firstDayLocation,
      secondDayLocation,
      firstDay,
      secondDay,
      genre,
      detail,
    );
    setItems([
      ...items,
      {
        id,
        title,
        firstDayLocation,
        secondDayLocation,
        firstDay,
        secondDay,
        genre,
        detail,
      },
    ]);
  };

  function savePresentation(
    id: string,
    title: string,
    firstDayLocation: number,
    secondDayLocation: number,
    firstDay: number | null,
    secondDay: number | null,
    genre: number[],
    detail: string | null,
  ) {
    const store = localStorage.getItem("presentationData");
    const data = store ? JSON.parse(store) : [];
    data.push({
      id,
      title,
      firstDayLocation,
      secondDayLocation,
      firstDay,
      secondDay,
      genre,
      detail,
    });
    localStorage.setItem("presentationData", JSON.stringify(data));
  }

  useEffect(() => {
    const store = localStorage.getItem("presentationData");
    const data = store ? JSON.parse(store) : [];
    setItems(data);
  }, []);

  const getPresentation = () => {
    const store = localStorage.getItem("presentationData");
    return store ? JSON.parse(store) : [];
  };

  const deleteBookMark = (id: string) => {
    Swal.fire({
      title: "ブックマークから削除しますか？",
      showCancelButton: true,
      confirmButtonText: `削除`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = getPresentation();
        const newData = data.filter(
          (presentation: { id: string } | null) =>
            presentation && presentation.id !== id,
        );
        localStorage.setItem("presentationData", JSON.stringify(newData));
        setItems(newData);
      }
    });
  };

  const isBookmarked = (id: string) => {
    return items && items.some((item) => item && item.id === id);
  };

  // ハイライト処理のヘルパー関数
  const getHighlightedTitle = () => {
    if (data._highlights?.title && data._highlights.title.length > 0) {
      return processElasticHighlight(
        data._highlights.title,
        data.title,
        searchKeyword,
      );
    }
    return searchKeyword
      ? highlightText(data.title, searchKeyword)
      : sanitizeText(data.title);
  };

  const getHighlightedDetail = () => {
    if (data._highlights?.detail && data._highlights.detail.length > 0) {
      return processElasticHighlight(
        data._highlights.detail,
        data.detail,
        searchKeyword,
      );
    }
    return searchKeyword
      ? highlightText(data.detail, searchKeyword)
      : sanitizeText(data.detail);
  };

  return (
    <div
      key={data.id}
      className={twMerge(
        `p-4 rounded border border-gray-300 bg-white shadow-md flex flex-col justify-between`,
        hFull ? "h-full" : "",
      )}
    >
      <div>
        <p
          className="text-center text-2xl font-semibold mb-2"
          dangerouslySetInnerHTML={{ __html: getHighlightedTitle() }}
        />
        {data.firstDay !== 0 ? (
          <p className="text-center">
            1日目:{" "}
            {LOCATION_DATA[data.firstDayLocation as keyof typeof LOCATION_DATA]}{" "}
            <span
              className={`font-bold`}
            >{`${data.firstDay === 1 ? "午前" : data.firstDay === 2 ? "午後" : "午前・午後"}`}</span>
          </p>
        ) : (
          <p className="text-center">1日目: 発表なし</p>
        )}
        {data.secondDay !== 0 ? (
          <p className="text-center">
            2日目:{" "}
            {
              LOCATION_DATA[
                data.secondDayLocation as keyof typeof LOCATION_DATA
              ]
            }{" "}
            <span
              className={`font-bold`}
            >{`${data.secondDay === 1 ? "午前" : data.secondDay === 2 ? "午後" : "午前・午後"}`}</span>
          </p>
        ) : (
          <p className="text-center">2日目: 発表なし</p>
        )}
        <p
          className="text-center pb-2 pt-2"
          dangerouslySetInnerHTML={{ __html: getHighlightedDetail() }}
        />
        <div className="flex items-center gap-2 flex-wrap justify-center mb-4">
          {returnGenre(data.genre.toSorted((a, b) => a - b))}
        </div>
      </div>
      <Button
        onClick={() =>
          isBookmarked(data.id)
            ? deleteBookMark(data.id)
            : addBookmark(
                data.id,
                data.title,
                data.firstDayLocation,
                data.secondDayLocation,
                data.firstDay,
                data.secondDay,
                data.genre,
                data.detail,
              )
        }
        className={`w-full py-2 rounded text-white transition-colors ${
          isBookmarked(data.id) ? "!bg-yellow-800" : "!bg-yellow-600"
        }`}
      >
        {isBookmarked(data.id) ? "ブックマークから削除" : "ブックマークする"}
      </Button>
    </div>
  );
}
