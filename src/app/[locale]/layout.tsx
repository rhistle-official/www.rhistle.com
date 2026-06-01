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
  const baseUrl = "https://rhistle.com";
  const currentUrl = locale === "ko" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    alternates: {
      canonical: currentUrl,
      languages: {
        ko: baseUrl,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      siteName: "rhistle.com",
      type: "website",
      images: [
        {
          url: `${baseUrl}/image/og-rhistle.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
  };
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

  const t = await getTranslations({ locale, namespace: "footer" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("name"),
    url: "https://rhistle.com",
  };

  return (
    <html lang={locale} className={`${pretendard.variable} ${audiowide.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
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
