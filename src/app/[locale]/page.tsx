import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaBand from "@/components/sections/CtaBand";
import ScrollDown from "@/components/sections/ScrollDown";
import StatsBand from "@/components/sections/StatsBand";
import { Link } from "@/i18n/navigation";
import corecodeImg from "@/public/image/corecode.jpg";
import hyundaiAutoeverImg from "@/public/image/hyundaiAutoever.png";
import kpmgImg from "@/public/image/kpmg.png";
import lgCNSImg from "@/public/image/lgCNS.png";
import nexummImg from "@/public/image/nexumm.jpg";
import poscoICTImg from "@/public/image/poscoICT.png";
import pwcImg from "@/public/image/pwc.png";
import samsungSDSImg from "@/public/image/samsungSDS.png";
import skCnCImg from "@/public/image/skCnC.png";
import thiraImg from "@/public/image/thira.png";

// Case text is sourced from messages (home.business.*); only the id is used here.
const cases = [{ id: "Case 01" }, { id: "Case 02" }, { id: "Case 03" }, { id: "Case 04" }];

const solutions = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    image: corecodeImg,
    translationKey: "solutions.corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/lx",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
];

const partners = [
  { name: "hyundaiAutoever", image: hyundaiAutoeverImg },
  { name: "lgCNS", image: lgCNSImg },
  { name: "poscoICT", image: poscoICTImg },
  { name: "samsungSDS", image: samsungSDSImg },
  { name: "skCnC", image: skCnCImg },
  { name: "thira", image: thiraImg },
  { name: "kpmg", image: kpmgImg },
  { name: "pwc", image: pwcImg },
];

const HomePage = () => {
  const home = useTranslations("home");

  return (
    <main>
      <section className="relative h-screen w-full">
        <div className="absolute bottom-0 z-10 flex h-screen w-full items-center justify-between bg-linear-to-b from-80% from-transparent via-90% via-transparent to-100% to-black text-white" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-white md:gap-4 xl:gap-6">
          <h1 className="font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
            {home("hero.title")}
          </h1>
          <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {home("hero.subtitle")}
          </h2>
        </div>
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <ScrollDown />
        </div>
        <video
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          className="h-full w-full object-cover brightness-70"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </section>

      <StatsBand />

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20">
        <div className="space-y-2 md:space-y-4">
          <h2 className="text-gray-500">Business Cases</h2>
          <p className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
            {home("business.title")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {cases.map((item) => (
            <article
              key={item.id}
              className="space-y-8 overflow-hidden rounded-3xl border border-gray-100 p-8 shadow-sm"
            >
              <div>
                <p className="text-gray-500">{item.id}</p>
                <h3 className="font-bold text-3xl">{home(`business.${item.id}.title`)}</h3>
                <p>{home(`business.${item.id}.subtitle`)}</p>
              </div>

              <div className="space-y-2 md:space-y-4">
                <div>
                  <h4 className="font-bold">Challenge</h4>
                  <p className="break-keep">"{home(`business.${item.id}.challenge`)}"</p>
                </div>

                <div>
                  <h4 className="font-bold">Solutions</h4>
                  <ul className="space-y-2">
                    {home.raw(`business.${item.id}.solutions`).map((sol: string) => (
                      <li key={sol} className="break-keep">
                        - {sol}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-rhistle">Results</h4>
                    <ul className="space-y-2">
                      {home.raw(`business.${item.id}.results`).map((result: string) => (
                        <li key={result} className="break-keep">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-rhistle">Business Benefits</h4>
                    <ul className="space-y-2">
                      {home.raw(`business.${item.id}.benefits`).map((benefit: string) => (
                        <li key={benefit} className="break-keep">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20">
        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-gray-500">Solutions</h2>
          <p className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
            {home("solutions.title")}
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
              <div className="relative h-90 overflow-hidden rounded-3xl">
                <Image
                  src={solution.image}
                  alt={solution.name}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 sm:space-y-4">
                <p className="font-bold text-3xl md:text-4xl xl:text-5xl">{solution.name}</p>
                <p>{home(solution.translationKey)}</p>
                <Link href={solution.href} className="flex items-center hover:text-rhistle">
                  {home("solutions.goto")}
                  <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-8 py-20">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-gray-500">Partners</h2>
            <p className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
              {home("partners")}
            </p>
          </div>

          <ul className="grid grid-cols-2 place-items-center gap-28 md:grid-cols-4 lg:grid-cols-4">
            {partners.map((partner) => (
              <li key={partner.name} className="relative h-30 w-30 md:h-40 md:w-40 xl:h-50 xl:w-50">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  sizes="(min-width: 1280px) 200px, (min-width: 768px) 160px, 120px"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand href="/pdf/RHISTLE_Brochure.pdf" name="company" />
    </main>
  );
};
export default HomePage;
