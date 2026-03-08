import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import corecodeImg from "../../public/images/corecode.jpg";
import nexummImg from "../../public/images/nexumm.jpg";

const solutions = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    image: corecodeImg,
    translationKey: "solutions.corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/nexumm",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
];

const Solutions = () => {
  const t = useTranslations("home");

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-8 py-20">
      <div className="space-y-4">
        <h2 className="font-medium text-gray-500 text-xl">Solutions</h2>
        <p className="break-keep font-bold text-5xl">
          디지털 혁신을 위한 솔루션
        </p>
      </div>
      <div className="flex flex-col gap-32">
        {solutions.map((solution, index) => (
          <article
            key={solution.name}
            className={`grid gap-12 md:grid-cols-2 ${
              index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Image */}
            <div className="relative h-90 overflow-hidden rounded-3xl">
              <Image
                src={solution.image}
                alt={solution.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <p className="font-bold text-4xl">{solution.name}</p>
              <p className="text-lg text-slate-600">
                {t(solution.translationKey)}
              </p>
              <Link
                href={solution.href}
                className="flex items-center text-slate-600"
              >
                바로가기 <ArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
