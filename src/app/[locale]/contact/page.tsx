import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";
import contactImg from "@/public/image/contact.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const page = () => {
  return (
    <main>
      <Banner bannerImg={contactImg} title="문의하기" />

      <section className="mx-auto grid max-w-7xl gap-16 px-8 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-extrabold text-5xl text-slate-900 tracking-tight">
            Contact <span className="text-rhistle">RHISTLE</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            리슬의 기술력이 귀사의 비즈니스에 <br />
            이로운 가치를 제공할 수 있도록 최선을 다하겠습니다.
          </p>

          <div className="space-y-6 font-medium text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                📍
              </span>
              <span>서울특별시 서초구 바우뫼로 160 현산빌딩 2층</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                📧
              </span>
              <span>contact@rhistle.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                📞
              </span>
              <span>02-3018-5114</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
};
export default page;
