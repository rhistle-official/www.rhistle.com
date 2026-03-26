import "./globals.css";

export const metadata = {
  title: {
    default: "리슬",
    template: "%s | 리슬",
  },
  description:
    "이롭고 슬기로운 기술로 고객의 가치를 더하는 IT 전문 기업, 리슬(RHISTLE)입니다.",
  openGraph: {
    title: "리슬",
    description:
      "이롭고 슬기로운 기술로 고객의 가치를 더하는 IT 전문 기업, 리슬(RHISTLE)입니다.",
    url: "https://www.rhistle.com/ko",
    siteName: "rhistle.com",
    type: "website",
    images: [
      {
        url: "https://www.rhistle.com/ko/image/og-rhistle.png",
        width: 1200,
        height: 630,
        alt: "리슬(RHISTLE)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
