import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
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

  return {
    metadataBase: new URL("https://rhistle.com"),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://rhistle.com",
      siteName: "rhistle.com",
      type: "website",
      images: [
        {
          url: "https://rhistle.com/image/og-rhistle.png",
          width: 1200,
          height: 630,
          alt: "리슬(RHISTLE)",
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${pretendard.variable} ${audiowide.variable} antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="vOadKuv4Iy8NVHLs3BjK6riU62KNXEqdBAnEvubLGtI"
        />
        <meta
          name="naver-site-verification"
          content="07cf86f4a5a618536e7521d06f50d64c4de1edae"
        />
      </head>
      <body>
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
