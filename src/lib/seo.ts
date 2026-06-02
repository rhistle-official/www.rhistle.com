import type { Metadata } from "next";

export const SITE_URL = "https://rhistle.com";
export const SITE_NAME = "rhistle.com";

/** 로케일별 절대 경로. ko는 prefix 없음(as-needed), en은 /en. */
export function localizedPath(locale: string, path = ""): string {
  const base = locale === "ko" ? SITE_URL : `${SITE_URL}/${locale}`;
  return `${base}${path}`;
}

/** canonical + hreflang alternates (canonical은 ko 절대경로). */
export function languageAlternates(path = "") {
  return {
    canonical: `${SITE_URL}${path}`,
    languages: {
      ko: `${SITE_URL}${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  };
}

/** 페이지 metadata 공통 빌더. */
export function buildMetadata(params: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, path = "", title, description } = params;
  const url = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: languageAlternates(path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
