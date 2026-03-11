import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CallToAction from "@/components/CallToAction";
import ScrollDown from "@/components/ScrollDown";
import Stats from "@/components/Stats";
import { Link } from "@/i18n/navigation";
import corecodeImg from "../../../../public/images/corecode.jpg";
import hyundaiAutoeverImg from "../../../../public/images/hyundaiAutoever.png";
import kpmgImg from "../../../../public/images/kpmg.png";
import lgCNSImg from "../../../../public/images/lgCNS.png";
import nexummImg from "../../../../public/images/nexumm.jpg";
import poscoICTImg from "../../../../public/images/poscoICT.png";
import pwcImg from "../../../../public/images/pwc.png";
import samsungSDSImg from "../../../../public/images/samsungSDS.png";
import skCnCImg from "../../../../public/images/skCnC.png";
import thiraImg from "../../../../public/images/thira.png";

const cases = [
  {
    id: "Case 01",
    title: "스마트팩토리 컨설팅",
    subtitle: "A 제조사 스마트팩토리 로드맵 수립",
    challenge: "시스템 기반 운영 경험 부재 및 데이터 관리 추진 방향 설정 필요",
    solutions: [
      "OT/IT/AT 통합 컨설팅 서비스 제공",
      "현장 진단을 통한 데이터 수집/분석/활용 스마트팩토리 로드맵 수립",
    ],
    results: [
      "생산성 30%, 품질 44% 향상 목표 수립",
      "스마트팩토리 방향 설정 혁신 과제 수립",
      "혁신 과제 추진 로드랩 및 추진 전략 수립",
    ],
    benefits: ["스마트팩토리 전환 기반 마련"],
  },
  {
    id: "Case 02",
    title: "WMS(창고관리시스템) 구축",
    subtitle: "원자재/완제품/VMI 창고 통합 관리",
    challenge: "실시간 재고 추적 및 위치 관리 미흡, 규제 대응력 강화 필요",
    solutions: [
      "창고 운영 프로세스 및 기준정보 표준화",
      "Value Added Service(조립/소진 등) 기능 개발",
      "Cloud 기반의 글로벌 확산형 WMS 구축",
    ],
    results: [
      "공급망 대응 및 운영 효율 제고",
      "디지털 창고 관리 기반 확보",
      "규제 준수 및 대응력 강화",
    ],
    benefits: ["창고 업무 효율 제고", "재고 Visibility 강화"],
  },
  {
    id: "Case 03",
    title: "통합 방재 모니터링 시스템",
    subtitle: "A 제조사 선진 방재 시스템 구축",
    challenge: "유관 시스템 간 연계 부재로 위기 대응 속도 저하 및 비용 증가",
    solutions: [
      "화재/가스/온도 센서 및 CCTV 통합 방재 모니터링 시스템 구축",
      "실시간 모니터링 및 통계 분석을 통한 조기 대응 및 사전 예방 체계 구축",
      "위험 감지 및 적기 안내를 통한 전사 위기 관리 시스템 구축",
    ],
    results: [
      "실시간 재해 요인 감지 및 통합 모니터링 시스템 운영",
      "통합 데이터 모니터링 및 분석을 통한 방지 운영 효율 향상",
    ],
    benefits: ["운영 비용 연간 76억 절감", "운영 효율화 50% 향상"],
  },
  {
    id: "Case 04",
    title: "스마트팩토리 설비 자동화",
    subtitle: "양방향 실시간 데이터 연동 체계",
    challenge: "대량 데이터의 실시간 처리 및 제조 환경 변화에 대한 유연한 대응",
    solutions: [
      "Plant Floor 데이터 수집 표준 체계 구축",
      "모델링 기반의 설비별 표준 Adaptor 적용",
      "신제조시스템(MES/품질관리) 양방향 실시간 연계",
    ],
    results: [
      "24x7 생산시스템의 안정적 운영",
      "Lot 기반 전 공정 품질 추적",
      "설비 추가 및 변경, 라인 변경 및 확대 등의 사업 환경 변화 대응력 강화",
    ],
    benefits: [
      "시스템 장애 Near to Zero 달성",
      "설비 자동화 구축 시간 34% 단축",
    ],
  },
];

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

const page = () => {
  const t = useTranslations("home");

  return (
    <main>
      <section className="relative h-screen w-full">
        <div className="absolute bottom-0 z-10 flex h-screen w-full items-center justify-between bg-linear-to-b from-80% from-transparent via-90% via-transparent to-100% to-black text-white" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-white md:gap-4 xl:gap-6">
          <h1 className="font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
            {t("hero.title")}
          </h1>
          <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {t("hero.subtitle")}
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

      <Stats />

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20">
        <div className="space-y-2 md:space-y-4">
          <h2 className="text-gray-500">Business Cases</h2>
          <p className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
            디지털 전환 성공 사례
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
                <h3 className="font-bold text-3xl">{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>

              <div className="space-y-2 md:space-y-4">
                <div>
                  <h4 className="font-bold">Challenge</h4>
                  <p className="break-keep">"{item.challenge}"</p>
                </div>

                <div>
                  <h4 className="font-bold">Solutions</h4>
                  <ul className="space-y-2">
                    {item.solutions.map((sol) => (
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
                      {item.results.map((result) => (
                        <li key={result} className="break-keep">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-rhistle">
                      Business Benefits
                    </h4>
                    <ul className="space-y-2">
                      {item.benefits.map((benefit) => (
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
                <p className="font-bold text-3xl md:text-4xl xl:text-5xl">
                  {solution.name}
                </p>
                <p>{t(solution.translationKey)}</p>
                <Link
                  href={solution.href}
                  className="flex items-center hover:text-rhistle"
                >
                  바로가기 <ArrowRight />
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
              리슬과 함께하는 혁신 파트너
            </p>
          </div>

          <ul className="grid grid-cols-2 place-items-center gap-28 md:grid-cols-4 lg:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="relative h-30 w-30 md:h-40 md:w-40 xl:h-50 xl:w-50"
              >
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

      <CallToAction
        href="/pdf/RHISTLE_Profile.pdf"
        download="회사소개서_(주)리슬.pdf"
        title="회사소개서 다운로드"
      />
    </main>
  );
};
export default page;
