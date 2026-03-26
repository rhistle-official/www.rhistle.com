"use client";

import localFont from "next/font/local";
import Image from "next/image";
import { useRouter } from "next/navigation";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
  variable: "--font-pretendard",
});

export default function NotFound() {
  const router = useRouter();

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-8">
          <div className="relative h-75 w-75 lg:h-100 lg:w-100">
            <Image
              src="/image/404.png"
              alt="404"
              sizes="(min-width: 1280px) 400px, 300px"
              fill
              priority
            />
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <button
              type="button"
              onClick={() => {
                router.push("/");
              }}
              className="cursor-pointer rounded-xl border border-rhistle bg-rhistle px-6 py-3 font-bold text-sm text-white transition-colors duration-200 hover:bg-rhistle/90 lg:text-lg"
            >
              메인 페이지로 이동
            </button>
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="cursor-pointer rounded-xl border border-rhistle px-6 py-3 font-bold text-rhistle text-sm transition-colors duration-200 hover:bg-gray-50 lg:text-lg"
            >
              이전 페이지로 이동
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
