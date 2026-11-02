import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/mypage/",
        "/notallowed/",
        "/notallowed-h3/",
        "/api/",
        "/comingsoon/",
        "/invite/",
        "/student-login/",
        "/locked/",
        "/cdn-cgi/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}