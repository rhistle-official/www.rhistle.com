import "../globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import MotionProvider from "@/components/motion/MotionProvider";
import { routing } from "@/i18n/routing";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
  variable: "--font-pretendard",
});

const audiowide = localFont({
  src: "../fonts/Audiowide-Regular.woff2",
  display: "swap",
  weight: "400",
  preload: true,
  variable: "--font-audiowide",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({ locale, description: t("description") });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${pretendard.variable} ${audiowide.variable} antialiased`}
    >
      <head>
        <meta name="naver-site-verification" content="847a27e4d83591c1e484375799ab1b5d844f3bc0" />
        <meta
          name="google-site-verification"
          content="f7UhvR4VHwm6tdM7q6TxMUSHnTZSvf20ZfwDzIgHvFs"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: 정적 JSON-LD 구조화 데이터
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
        <NextIntlClientProvider>
          <MotionProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </MotionProvider>
        </NextIntlClientProvider>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
