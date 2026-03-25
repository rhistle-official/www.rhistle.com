import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rhistle.com";
  const locales = ["ko", "en"];
  const routes = [
    "",
    "/company",
    "/contact",
    "/solutions/corecode",
    "/solutions/nexumm",
  ];

  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ko: `${baseUrl}/ko${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    })),
  );

  return sitemapEntries;
}
