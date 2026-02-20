import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rhistle.com"),
  title: {
    default: "RHISTLE",
    template: "%s | RHISTLE",
  },
  description:
    "이롭고 슬기로운 기술로 고객의 가치를 더하는 IT 전문 기업, 주식회사 리슬(RHISTLE)입니다.",
  verification: {
    google: "vOadKuv4Iy8NVHLs3BjK6riU62KNXEqdBAnEvubLGtI",
  },
  alternates: {
    canonical: "https://www.rhistle.com/ko", // 기본 페이지 설정
    languages: {
      "ko-KR": "https://www.rhistle.com/ko",
      "en-US": "https://www.rhistle.com/en",
    },
  },
  openGraph: {
    siteName: "RHISTLE",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "RHISTLE",
        alternateName: "리슬",
        url: "https://www.rhistle.com",
      },
      {
        "@type": "Organization",
        name: "RHISTLE",
        url: "https://www.rhistle.com",
        logo: "https://www.rhistle.com/logo_white.webp",
      },
    ],
  };

  return (
    <html lang={locale}>
      <body className={`${pretendard.variable}`}>
        <Script
          id="jsonld-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
