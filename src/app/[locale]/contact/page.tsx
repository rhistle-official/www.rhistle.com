import { Mail, MapPin, Phone } from "lucide-react";
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
      <PageHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        image={contactImg}
      />

      <section className="container-page section grid gap-16 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-extrabold text-h1 text-ink tracking-tight">
            Contact <span className="text-rhistle">RHISTLE</span>
          </h2>
          <p className="text-graphite text-lg leading-relaxed">{t("intro.description")}</p>

          <ul className="divide-y divide-line">
            <li className="flex items-center gap-4 py-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-rhistle">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span className="text-graphite">{t("intro.address")}</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-rhistle">
                <Mail className="size-5" aria-hidden />
              </span>
              <span className="text-graphite">contact@rhistle.com</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-rhistle">
                <Phone className="size-5" aria-hidden />
              </span>
              <span className="text-graphite">02-3018-5114</span>
            </li>
          </ul>
        </div>
        <ContactForm />
      </section>
    </main>
  );
};
export default ContactPage;
