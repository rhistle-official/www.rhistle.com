import Image from "next/image";
import { useTranslations } from "next-intl";
import corecodeImg from "../../public/images/corecode.jpg";
import nexummImg from "../../public/images/nexumm.jpg";

const solutions = [
  {
    name: "CoreCode",
    image: corecodeImg,
    translationKey: "solutions.corecode",
  },
  {
    name: "Nexumm",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
];

const SolutionsSection = () => {
  const t = useTranslations("home");

  return (
    <section className="bg-rhistle">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20 md:gap-25 xl:gap-30">
        <span className="font-bold text-4xl text-white md:text-5xl xl:text-6xl">
          Solutions
        </span>
        <div className="flex flex-col gap-10 md:flex-row">
          {solutions.map((solution) => (
            <article
              key={solution.name}
              className="overflow-hidden rounded-4xl bg-white shadow-xl"
            >
              <div className="relative h-50">
                <Image
                  src={solution.image}
                  alt="corecode"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-70"
                />
                <span className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                  {solution.name}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-6">
                <span className="font-extrabold text-2xl text-slate-900 md:text-4xl">
                  {solution.name}
                </span>
                <span className="text-base text-slate-600 md:text-lg">
                  {t(solution.translationKey)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
