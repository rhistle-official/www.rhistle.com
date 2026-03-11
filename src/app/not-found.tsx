"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { pretendard } from "./fonts";

export default function NotFound() {
  const router = useRouter();

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
          <Image
            src={"/images/404.png"}
            alt="404"
            width={400}
            height={400}
            priority
          />
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => {
                router.push("/");
              }}
              className="cursor-pointer rounded-xl bg-rhistle px-6 py-3 font-bold text-lg text-white transition-colors duration-200 hover:bg-rhistle/90"
            >
              메인 페이지로 이동
            </button>
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="cursor-pointer rounded-xl border border-rhistle px-6 py-3 font-bold text-lg text-rhistle transition-colors duration-200 hover:bg-gray-50"
            >
              이전 페이지로 이동
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
