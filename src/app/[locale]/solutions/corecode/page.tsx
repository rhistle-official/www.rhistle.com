import Image from "next/image";
import SolutionsTab from "@/components/SolutionsTab";
import bannerImg from "../../../../../public/images/corecode.jpg";

export async function generateMetadata() {
  return {
    title: "CoreCode",
    description: "리슬의 CoreCode를 소개하는 페이지입니다.",
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
            CoreCode
          </h1>
        </div>
      </section>

      {/* 탭 영역 */}
      <section>
        <SolutionsTab />
      </section>

      {/* 본문 */}
      <section></section>
    </main>
  );
};
export default page;
