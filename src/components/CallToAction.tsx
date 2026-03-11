import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CallToAction = ({
  href,
  download,
  name,
}: {
  href: string;
  download: string;
  name: string;
}) => {
  const home = useTranslations("home");

  return (
    <section className="border-gray-200 border-t">
      <div className="mx-auto max-w-7xl items-center justify-between space-y-2 px-8 py-10 text-sm sm:flex md:py-15 md:text-base xl:py-20 xl:text-xl">
        <p>{home("cta.message")}</p>
        <div className="space-x-2 space-y-2">
          <a
            href={href}
            download={download}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {home(name)}
          </a>
          <Link
            href={"/contact"}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {home("cta.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
