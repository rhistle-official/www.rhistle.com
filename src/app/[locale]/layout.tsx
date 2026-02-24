import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Audiowide } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
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

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: "RHISTLE",
      template: "%s | RHISTLE",
    },
    description: t("description"),
    alternates: {
      canonical: `https://www.rhistle.com/${locale}`,
      languages: {
        ko: "https://www.rhistle.com/ko",
        en: "https://www.rhistle.com/en",
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
      <body
        className={`${pretendard.variable} ${audiowide.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </NextIntlClientProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
