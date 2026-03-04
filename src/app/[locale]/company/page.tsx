import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  return {
    title: t("title"),
  };
}

const page = () => {
  return (
    <main>
      {/* 배너 영역 */}
      <section className="relative">
        <Image
          src="/company-banner.jpg"
          alt="company-banner"
          width={1920}
          height={1080}
          className="h-auto max-h-[70vh] w-full object-cover brightness-75"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold text-4xl text-white md:text-5xl">
            회사소개
          </h1>
        </div>
      </section>
    </main>
  );
};
export default page;
