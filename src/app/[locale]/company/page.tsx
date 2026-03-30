import {
  BatteryCharging,
  Building2,
  Car,
  Cpu,
  FlaskConical,
  Lightbulb,
  Shield,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Banner from "@/components/Banner";
import CallToAction from "@/components/CallToAction";
import History from "@/components/History";
import companyImg from "@/public/image/company.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const industries = [
  {
    title: "반도체 및 디스플레이",
    icon: Cpu,
    engTitle: "Semiconductor & Display",
    focus: "High volume, variety, velocity 데이터 처리 및 안전/환경 관리",
    projects: [
      "스마트팩토리 설비 자동화",
      "설비 엔지니어링 데이터 연계",
      "환경/안전 통합방재 모니터링",
    ],
  },
  {
    title: "2차 전지",
    engTitle: "Secondary Battery",
    icon: BatteryCharging,
    focus: "대규모 설비 중심의 자본 집약적 공정 및 데이터 분석 강화",
    projects: [
      "제조 IoT Platform 구축",
      "설비 연계 시스템 구축",
      "Gas Leak 및 Utility 통합 모니터링",
    ],
  },
  {
    title: "바이오 제약 및 식품",
    engTitle: "Bio & Food",
    icon: FlaskConical,
    focus: "GMP, CSV 준수 및 배치 생산 공정 최적화",
    projects: [
      "스마트팩토리 설비 자동화",
      "WMS(창고관리시스템) 구축",
      "통합 폐수처리 시스템 구축",
    ],
  },
  {
    title: "자동차 / 철강",
    engTitle: "Automotive & Steel",
    icon: Car,
    focus: "단순 조립, 협력사 협업 생산 및 다양한 인터페이스 방식 대응",
    projects: [
      "글로벌 전장 검사 시스템 구축",
      "협력사 부품 품질 데이터 연계 구축",
      "설비 연계 시스템 구축",
    ],
  },
  {
    title: "일반 제조 및 공공",
    engTitle: "General Mfg & Public",
    icon: Building2,
    focus: "안전/환경 시스템 고도화 및 전사 통합 시스템 구축",
    projects: [
      "스마트팩토리 구축 컨설팅",
      "FEMS/ERP 데이터 연동 시스템 구축",
      "전사 통합 시스템 고도화",
    ],
  },
];

const companyValues = [
  {
    title: "Vision",
    icon: Lightbulb,
    text: '"데이터와 기술로 진화하는 디지털 혁신의 리더"',
  },
  {
    title: "Mission",
    icon: Target,
    text: '"데이터 통합과 지능형 시스템 구축을 통해 고객과 산업, 세상에 이로운 변화를 만든다."',
  },
  {
    title: "Core Values",
    icon: Shield,
    items: [
      {
        subtitle: "Expertise",
        description:
          "검증된 솔루션과 고도화된 기술 역량으로 최상의 IT 서비스를 제공합니다.",
      },
      {
        subtitle: "Agility",
        description:
          "변화하는 환경에 민첩하게 대응하며 실행력 중심의 혁신을 선도합니다.",
      },
      {
        subtitle: "Human-Centric",
        description:
          "'리(利)롭게 슬기롭게'의 가치 아래 사람을 위한 기술을 추구합니다.",
      },
    ],
  },
];

const page = () => {
  return (
    <main>
      <Banner bannerImg={companyImg} title="회사소개" />

      <div className="mx-auto max-w-7xl px-8">
        <section className="space-y-8 break-keep py-32 text-center leading-tight">
          <h1>
            <p className="block font-semibold text-4xl text-gray-800">
              <span className="font-bold text-rhistle">리슬</span>은 데이터 기술
              역량을 바탕으로
            </p>
            <p className="block font-extrabold text-5xl text-gray-900 leading-normal tracking-tight">
              제조 현장부터 통합 물류, <br />
              고객 접점 및 업무 효율까지 가치를 선도하는 <br />
              <span className="text-rhistle">디지털 전환(DX) 전문기업</span>
              입니다.
            </p>
            <span className="block font-normal text-2xl text-gray-500">
              품질이 검증된 솔루션과 고도의 기술력을 기반으로 <br />
              최고의 IT 서비스를 약속합니다.
            </span>
          </h1>
        </section>

        <section className="space-y-6 py-16">
          <p className="font-medium text-gray-500 text-xl">Industry Served</p>
          <h2 className="break-keep font-bold text-5xl">
            다양한 제조 산업의 <br />
            디지털 전환을 함께합니다
          </h2>

          <div className="space-y-8">
            {industries.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="grid grid-cols-2 rounded-3xl border border-gray-100 p-10 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="rounded-2xl bg-blue-50 p-4 shadow-sm">
                        <Icon className="h-12 w-12 text-rhistle" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-3xl text-gray-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="font-semibold text-rhistle text-sm">
                        {item.engTitle}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-gray-400 tracking-tighter">
                        Key Focus
                      </p>
                      <p className="break-keep text-gray-600 text-lg leading-snug">
                        {item.focus}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold text-gray-400 tracking-widest">
                      Service Scope
                    </p>
                    <ul className="space-y-3">
                      {item.projects.map((project) => (
                        <li
                          key={project}
                          className="flex items-center gap-3 break-keep text-gray-700 text-xl"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rhistle" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-2 py-16 sm:space-y-4">
          <p className="font-medium text-gray-500 text-xl">Company Values</p>
          <h2 className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
            리슬이 지향하는 미래
          </h2>

          <div className="space-y-8">
            {companyValues.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-10 shadow-sm"
                >
                  {Icon && (
                    <Icon className="absolute right-0 bottom-0 h-35 w-35 text-blue-100 opacity-50" />
                  )}

                  <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 font-bold text-blue-900">
                      <span className="h-8 w-2 rounded-full bg-rhistle" />
                      {value.title}
                    </h3>

                    {value.text && (
                      <p className="break-keep text-gray-700 text-xl leading-relaxed">
                        {value.text}
                      </p>
                    )}

                    {value.items?.map((item) => (
                      <div key={item.subtitle}>
                        <h4 className="font-bold text-blue-600 text-sm tracking-wide">
                          {item.subtitle}
                        </h4>
                        <p className="break-keep text-gray-700 text-xl leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <History />
      </div>

      <CallToAction href="/pdf/RHISTLE_Brochure.pdf" name="company" />
    </main>
  );
};
export default page;
