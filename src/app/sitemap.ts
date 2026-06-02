import type { MetadataRoute } from "next";

const host = "https://rhistle.com";
const hrefs = ["", "/company", "/contact", "/solutions/corecode", "/solutions/lx", "/solutions/vx"];

export default function sitemap(): MetadataRoute.Sitemap {
  return hrefs.map((href) => ({
    url: `${host}${href}`,
    lastModified: new Date().toISOString(),
    alternates: {
      languages: {
        ko: `${host}${href}`,
        en: `${host}/en${href}`,
      },
    },
  }));
}
