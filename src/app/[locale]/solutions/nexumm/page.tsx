import Banner from "@/components/Banner";
import SolutionsTab from "@/components/SolutionsTab";
import nexummImg from "../../../../../public/images/nexumm.jpg";

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
      <Banner bannerImg={nexummImg} title="Nexumm" />

      <SolutionsTab />

      <section className="mx-auto max-w-7xl px-8 py-40 text-center">
        <h2 className="font-bold text-2xl text-gray-400">
          정확한 정보 전달을 위해 업데이트 중입니다.
        </h2>
      </section>
    </main>
  );
};
export default page;
