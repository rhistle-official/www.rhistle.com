import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import bannerImg from "../../../../public/images/inquiry.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: "리슬의 문의하기 페이지입니다."
  };
}

const page = () => {
  return (
    <main>
      {/* 배너 영역 */}
      <section className="relative h-100">
        <Image
          src={bannerImg}
          alt="inquiry-banner"
          fill
          sizes="100vw"
          className="object-cover brightness-70"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold text-2xl text-white md:text-3xl lg:text-5xl">
            문의하기
          </h1>
        </div>
      </section>
    </main>
  );
};
export default page;
