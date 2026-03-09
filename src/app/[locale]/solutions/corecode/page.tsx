import Banner from "@/components/Banner";
import SolutionsTab from "@/components/SolutionsTab";
import corecodeImg from "../../../../../public/images/corecode.jpg";

export async function generateMetadata() {
  return {
    title: "CoreCode",
    description: "리슬의 CoreCode를 소개하는 페이지입니다.",
  };
}

const page = () => {
  return (
    <main>
      <Banner bannerImg={corecodeImg} title="CoreCode" />

      <SolutionsTab />

      <section className="mx-auto max-w-7xl px-8"></section>
    </main>
  );
};
export default page;
