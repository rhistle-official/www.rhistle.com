import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.rhistle.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ko: "https://www.rhistle.com/ko",
          en: "https://www.rhistle.com/en",
        },
      },
    },
    {
      url: "https://www.rhistle.com/company",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ko: "https://www.rhistle.com/ko/company",
          en: "https://www.rhistle.com/en/company",
        },
      },
    },
    {
      url: "https://www.rhistle.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ko: "https://www.rhistle.com/ko/contact",
          en: "https://www.rhistle.com/en/contact",
        },
      },
    },
    {
      url: "https://www.rhistle.com/solutions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ko: "https://www.rhistle.com/ko/solutions",
          en: "https://www.rhistle.com/en/solutions",
        },
      },
    },
  ];
}
