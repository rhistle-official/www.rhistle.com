import type { Metadata } from "next";

export const SITE_URL = "https://rhistle.com";
export const SITE_NAME = "RHISTLE";

/** 모든 페이지 공통 정적 타이틀(로케일별). */
export const SITE_TITLE: Record<string, string> = {
  ko: "스마트팩토리 컨설팅·구축 전문 IT기업 | 리슬",
  en: "Smart Factory Consulting & Implementation IT Company | RHISTLE",
};

/** 로케일별 정적 타이틀(미지원 로케일은 ko로 폴백). */
export function siteTitle(locale: string): string {
  return SITE_TITLE[locale] ?? SITE_TITLE.ko;
}

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
  title?: string;
  description: string;
}): Metadata {
  const { locale, path = "", title = siteTitle(locale), description } = params;
  const url = localizedPath(locale, path);
  return {
    metadataBase: new URL(SITE_URL),
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

/** 조직 정보 구조화 데이터(JSON-LD). 검색 결과 노출/지식패널용. */
export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ko" ? "주식회사 리슬" : "RHISTLE Inc.",
    alternateName: "RHISTLE",
    url: SITE_URL,
    email: "contact@rhistle.com",
    telephone: "+82-2-3018-5114",
    description:
      locale === "ko"
        ? "스마트팩토리 컨설팅·구축 전문 IT기업 리슬(RHISTLE)입니다."
        : "RHISTLE — an IT company specializing in smart factory consulting and implementation.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "바우뫼로 160, 현산빌딩 2층",
      addressLocality: "서초구",
      addressRegion: "서울특별시",
      addressCountry: "KR",
    },
  };
}
