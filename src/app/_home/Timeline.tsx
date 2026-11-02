import { formatJSTDateShort } from "@/lib/date";
import { jackeyFont } from "../fonts";
import Link from "next/link";

import "./../home.css";

interface News {
  id: string | number;
  href: string;
  createdAt: string | Date;
  title: string;
}

export default function Timeline({ news }: { news: News[] }) {
  return (
    <div className="h-48">
      <section className="h-32 mt-8 overflow-y-auto flex flex-col items-center gap-8">
        {news.map((n) => (
          <article key={n.id}>
            <Link
              href={`${n.href}`}
              className="flex flex-col md:flex-row gap-0 md:gap-8 w-80 md:w-[48rem] border-b-2 border-maintext pb-1 text-xl font-bold"
            >
              <span
                className={`md:ml-2 text-base md:text-2xl ${jackeyFont.className}`}
              >
{formatJSTDateShort(new Date(n.createdAt))}
              </span>
              <p className="leading-8">{n.title}</p>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
