import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";
import PageHero from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import contactImg from "@/public/image/contact.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return buildMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

const ContactPage = () => {
  const t = useTranslations("contact");

  return (
    <main>
      <PageHero bannerImg={contactImg} title={t("hero")} />

      <section className="mx-auto grid max-w-7xl gap-16 px-8 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-extrabold text-5xl text-slate-900 tracking-tight">
            Contact <span className="text-rhistle">RHISTLE</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">{t("intro.description")}</p>

          <div className="space-y-6 font-medium text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                📍
              </span>
              <span>{t("intro.address")}</span>
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
export default ContactPage;
