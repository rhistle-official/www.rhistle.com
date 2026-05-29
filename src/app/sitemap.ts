import type { MetadataRoute } from "next";

const host = "https://rhistle.com";
const locales = ["", "/en"];
const hrefs = ["", "/company", "/contact", "/solutions/corecode", "/solutions/lx", "/solutions/vx"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    hrefs.map((href) => ({
      url: `${host}${locale}${href}`,
      lastModified: new Date().toISOString(),
    })),
  );
}
