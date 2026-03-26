import type { Metadata } from "next";
import "./globals.css";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://www.rhistle.com",
      siteName: "rhistle.com",
      type: "website",
      images: [
        {
          url: "https://www.rhistle.com/image/og-rhistle.png",
          width: 1200,
          height: 630,
          alt: "리슬(RHISTLE)",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
