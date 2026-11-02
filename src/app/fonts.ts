import {
  Noto_Sans_JP,
  DotGothic16,
  Inter,
  Kosugi_Maru,
  Roboto_Mono,
} from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const jackeyFont = localFont({
  src: "../../public/fonts/jackeyfont.woff2",
  display: "swap",
});

export const 幻ノにじみ明朝 = localFont({
  src: "../../public/fonts/幻ノにじみ明朝.otf",
  display: "swap",
});

export const kosugi = Kosugi_Maru({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const dotGothic = DotGothic16({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const siranu = localFont({
  src: "../../public/fonts/07ReallyScaryMinchotai.otf",
  display: "swap",
});

export const mintyou = localFont({
  src: "../../public/fonts/NotoSerifJP-VariableFont_wght.ttf",
  display: "swap",
});

export const gensouNijimi = localFont({
  src: "../../public/fonts/幻ノにじみ明朝.otf",
  display: "swap",
});
