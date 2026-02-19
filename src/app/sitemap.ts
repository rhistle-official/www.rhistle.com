import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://www.rhistle.com";

  // 현재 지원하는 언어 경로들
  const locales = ["ko", "en"];

  // 기본 경로들 (추가로 만든 페이지가 있다면 배열에 넣으세요).
  const routes = ["", "/company", "/contact", "/solutions"];

  const sitemapEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const, // 월간
      priority: route === "" ? 1 : 0.8, // 메인 페이지는 우선순위 1
    })),
  );

  return sitemapEntries;
};

export default sitemap;
