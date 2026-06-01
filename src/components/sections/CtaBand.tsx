import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CtaBand = ({ href, name }: { href?: string; name?: string }) => {
  const t = useTranslations("home.cta");

  return (
    <section className="border-gray-200 border-t">
      <div className="mx-auto max-w-7xl items-center justify-between space-y-2 px-8 py-10 text-sm sm:flex md:py-15 md:text-base xl:py-20 xl:text-xl">
        <p>{t("message")}</p>
        <div className="space-x-2 space-y-2">
          {href && name && (
            <a
              href={href}
              download={t(`download.${name}`)}
              className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
            >
              {t(`name.${name}`)}
            </a>
          )}
          <Link
            href={"/contact"}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CtaBand;
