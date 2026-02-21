import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://rhistle.com";
  const locales = ["ko", "en"];
  const routes = ["", "/company", "/contact", "/solutions"];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
};

export default sitemap;
