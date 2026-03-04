import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });

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
          src="/solution-banner.jpg"
          alt="solution-banner"
          width={1920}
          height={1080}
          className="h-auto max-h-[70vh] w-full object-cover object-top brightness-75"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold text-4xl text-white md:text-5xl">솔루션</h1>
        </div>
      </section>
    </main>
  );
};
export default page;
