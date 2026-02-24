import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center text-gray-800">
      <h1 className="font-bold text-5xl">🚧 페이지 공사중 🚧</h1>
      <p className="text-xl">조금만 기다려주세요. 곧 업데이트 됩니다!</p>
      <Link
        href="/"
        className="rounded bg-[#1428A0] px-6 py-3 text-white transition hover:bg-[#1428A0]/90"
      >
        홈으로
      </Link>
    </div>
  );
}
