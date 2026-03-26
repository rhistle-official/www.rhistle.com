import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rhistle.com";
  const routes = [
    "",
    "/company",
    "/contact",
    "/solutions/corecode",
    "/solutions/nexumm",
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
  }));

  return sitemapEntries;
}
