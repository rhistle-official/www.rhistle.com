import Image from "next/image";
import SolutionsTab from "@/components/SolutionsTab";
import bannerImg from "../../../../../public/images/nexumm.jpg";

export async function generateMetadata() {
  return {
    title: "Nexumm",
    description: "리슬의 Nexumm을 소개하는 페이지입니다.",
  };
}
const page = () => {
  return (
    <main>
      {/* 배너 영역 */}
      <section className="relative h-100">
        <Image
          src={bannerImg}
          alt="solution-banner"
          fill
          sizes="100vw"
          className="object-cover brightness-70"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold text-2xl text-white md:text-3xl lg:text-5xl">
            Nexumm
          </h1>
        </div>
      </section>

      {/* 탭 영역 */}
      <section>
        <SolutionsTab />
      </section>

      {/* 본문 */}
      <section className="mx-auto max-w-7xl px-8 py-40 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* 은은하게 깜빡이는 원형 포인트 */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
            <div className="relative h-4 w-4 rounded-full bg-blue-600"></div>
          </div>

          <h2 className="font-bold text-4xl text-slate-900 tracking-tight md:text-5xl">
            준비 중입니다
          </h2>
          <div>
            <p className="text-lg text-slate-500">
              리슬의 핵심 기술 가치를 담기 위해 현재 페이지를 최적화하고
              있습니다.
            </p>
            <p className="text-lg text-slate-500">
              더 나은 모습으로 곧 찾아뵙겠습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default page;
