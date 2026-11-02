import type { Metadata, Viewport } from "next";
import "./tailwind.css";
import "./globals.css";
import { gensouNijimi, notoSansJP, inter } from "./fonts";
import { Toaster } from "react-hot-toast";
import { SITE_URL } from "@/constants/site";
import ArchiveBanner from "@/components/ArchiveBanner";

export const viewport: Viewport = {
  themeColor: "#d62a2a",
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "広尾学園 2026年けやき祭「燈灯」公式サイト",
    template: "%s | 広尾学園 2026年けやき祭",
  },
  description:
    "広尾学園の2026年けやき祭「燈灯」公式サイト。発表団体、販売商品、校内マップ、混雑状況、開催情報をご案内します。",
  keywords: [
    "けやき祭",
    "2026年けやき祭",
    "けやき祭2026",
    "広尾学園",
    "広尾学園文化祭",
    "広尾学園けやき祭",
    "燈灯",
    "文化祭",
    "hiroogakuen",
  ],
  metadataBase: new URL(SITE_URL),
  applicationName: "2026年けやき祭",
  authors: [{ name: "広尾学園 広報部門" }],
  creator: "広尾学園 広報部門",
  publisher: "広尾学園",
  category: "education",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.svg", sizes: "180x180" }],
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/logo.svg" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "広尾学園 2026年けやき祭",
    title: "広尾学園 2026年けやき祭「燈灯」公式サイト",
    description:
      "広尾学園の2026年けやき祭「燈灯」公式サイト。発表団体、販売商品、校内マップ、混雑状況、開催情報をご案内します。",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 740,
        height: 943,
        alt: "広尾学園 2026年けやき祭「燈灯」ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "広尾学園 2026年けやき祭「燈灯」公式サイト",
    description:
      "広尾学園の2026年けやき祭「燈灯」公式サイト。開催情報や校内マップをご案内します。",
    images: [`${SITE_URL}/logo.webp`],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "広尾学園 けやき祭実行委員会",
      parentOrganization: {
        "@type": "Organization",
        name: "広尾学園",
      },
      url: SITE_URL,
      logo: `${SITE_URL}/logo.webp`,
      sameAs: [
        "https://x.com/hgkeyakifes",
        "https://www.instagram.com/hg_keyakifes/",
        "https://note.com/hirogakukeyaki",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "広尾学園 2026年けやき祭「燈灯」",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "ja-JP",
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#keyaki-festival-2026`,
      name: "広尾学園 2026年けやき祭「燈灯」",
      description:
        "広尾学園で開催される2026年けやき祭。2026年10月3日(土)・4日(日)の2日間で開催されます。",
      url: SITE_URL,
      image: [`${SITE_URL}/logo.webp`],
      startDate: "2026-10-03T00:00:00+09:00",
      endDate: "2026-10-04T23:59:59+09:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "広尾学園中学校高等学校",
        address: {
          "@type": "PostalAddress",
          postalCode: "106-0047",
          addressLocality: "港区",
          addressRegion: "東京都",
          streetAddress: "南麻布5-1-14",
          addressCountry: "JP",
        },
      },
      organizer: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="a8GqNzhmIT-Aml9A6estVN-5Tm-Kr8dmu7bAYTvF88A" />
      </head>
      <body
        style={{
          fontFamily: `${gensouNijimi.style.fontFamily}, ${inter.style.fontFamily}, ${notoSansJP.style.fontFamily}, sans-serif`,
        }}
      > 
       <ArchiveBanner />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
