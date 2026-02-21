import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = "https://rhistle.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "RHISTLE",
      template: "%s | RHISTLE",
    },
    description:
      "이롭고 슬기로운 기술로 고객의 가치를 더하는 IT 전문 기업, 주식회사 리슬(RHISTLE)입니다.",
    openGraph: {
      title: "RHISTLE",
      url: `${baseUrl}/${locale}`,
      siteName: "RHISTLE",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "RHISTLE",
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "ko-KR": "/ko",
        "en-US": "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${pretendard.variable}`}>
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
