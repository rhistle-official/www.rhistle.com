import { Database, Factory, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import CallToAction from "@/components/CallToAction";
import SolutionHero from "@/components/SolutionHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  return {
    title: "CoreCode",
    description: t("description"),
  };
}

const features = [
  {
    id: "01",
    title: "산업용 표준 Adaptor",
    desc: ["다양한 설비, PLC, DCS 대응", "표준 인터페이스로 능동적 변화 대응"],
  },
  {
    id: "02",
    title: "통합 개발 환경",
    desc: ["모델링 기반 개발 및 테스트", "Adaptor Modeler / Visual Debugger", "Tag Manager 지원"],
  },
  {
    id: "03",
    title: "프로세싱 엔진",
    desc: ["Run-Time 시스템 자원 관리", "메시지 Routing 및 전달 보증", "표준 통신 프로토콜 지원"],
  },
  {
    id: "04",
    title: "시스템 운영 관리",
    desc: ["실시간 자원 모니터링", "데이터 통계 및 분석", "원격 프로그램 변경/관리"],
  },
  {
    id: "05",
    title: "원격 에이전트",
    desc: ["소형 미들웨어 엔진 기능", "서버 인터페이스 연동", "원격 유지관리 및 Logging"],
  },
];

const highlights = [
  {
    title: "표준 체계 지원",
    details: [
      "표준 통신 프로토콜 지원 (OPC, Modbus, Ethernet/IP 등)",
      "산업별 표준 데이터 체계 지원",
    ],
  },
  {
    title: "다양한 데이터 연계/통합 자산",
    details: ["100여종 이상의 Adaptors (PLC, Sensors, Files, DB 등)", "연계 기술 및 노하우 탑재"],
  },
  {
    title: "개발/운영 고효율 및 고성능",
    details: [
      "로우 코드 기반 개발 및 시각적 디버깅",
      "고성능 3V (Volume, Variety, Velocity) 데이터 처리",
    ],
  },
];

const functionalities = [
  "설비 연계 및 데이터 인티그레이션",
  "모델링 기반 개발 및 시각적 디버깅",
  "시스템 가동 현황 모니터링 및 이상 추적",
  "시스템 운영 관리",
];

const performanceData = [
  {
    badge: "Speedy",
    title: "개발 생산성 ↑",
    descriptions: [
      "모델링(Low-Code) 기반 개발 도구와 Visual Debugger 등 직관적 개발 환경",
      "현장에서 검증된 인터페이스 및 Built-In 컴포넌트 제공",
      "Custom 컴포넌트 개발을 위한 API 제공",
    ],
  },
  {
    badge: "Stable",
    title: "운영 안정성 ↑",
    descriptions: [
      "대용량 데이터 초고속 처리 Throughput 보장",
      "Up-time 100% 검증 및 솔루션 이중화 기반 고가용성",
      "System Monitoring 및 운영 Utility 제공",
    ],
  },
  {
    badge: "Flexible",
    title: "유연성 ↑",
    descriptions: [
      "다양한 설비 및 센서 연계를 위한 아키텍처 구성",
      "설비/센서 벤더와 독립적인 시스템 구축",
      "신규 설비 추가 및 변경에 빠르게 대응",
    ],
  },
];

const effectData = [
  {
    title: "제조 가시성 확보 및 경쟁력 강화로",
    highlight: "제조 가치 제고",
    icon: Factory,
    descriptions: [
      "제조 현장의 실시간 파악을 통한 제조 경쟁력 강화",
      "검사/계측 설비 데이터 관리를 통한 제품 품질 향상",
      "제조 환경 및 안전 관련 데이터 관리를 통한 ESG 성과 개선",
    ],
  },
  {
    title: "실시간 데이터 기반 의사결정 및 분석을 통한",
    highlight: "운영/관리 역량 제고",
    icon: Database,
    descriptions: [
      "실시간 데이터 기반으로 적기, 정확한 의사 결정",
      "설비, 센서 증가에 대한 체계적 연결 및 데이터 관리",
      "연계 시스템 구축 및 관리 비용 절감",
    ],
  },
  {
    title: "설비, IoT 디바이스에 대한 운영 관리로",
    highlight: "지속적 성과 개선",
    icon: TrendingUp,
    descriptions: [
      "현장 설비 및 현장 활동의 주요 특성 파악",
      "데이터 분석을 통한 문제점 식별 및 지속적 개선",
    ],
  },
];

const page = () => {
  return (
    <main>
      <SolutionHero
        code="CoreCode"
        name="Data Interface Solution"
        tagline="흩어진 데이터를 하나로 잇다"
        description="다양한 설비·시스템의 데이터를 실시간으로 수집·연계하는 로우코드(Low-Code) 기반 통합 데이터 인터페이스 솔루션입니다."
        gradient="from-[#0f8a5f] via-[#0a5d44] to-[#04231a]"
      />

      <section className="mx-auto max-w-7xl space-y-16 px-8 py-20 md:text-lg xl:text-xl">
        <div className="space-y-6">
          <p className="font-bold text-rhistle">Overview</p>
          <p>
            Industry 4.0시대, 데이터는 기업의 핵심 자산이며 데이터 수집과 관리는 주요 성공
            요소입니다. <br />
            그러나 지속적인 혁신을 위한 제조 현장의 데이터 수집 및 관리에는 많은 제약이 있습니다.
          </p>

          <div className="w-full max-w-7xl">
            <Image
              src="/image/corecode_overview_1.png"
              alt="corecode_overview_1"
              width={2525}
              height={1128}
              className="h-auto w-full"
            />
          </div>

          <p>
            로우 코드(Low-Code) 기반의 IoT 데이터 연계 및 저장을 쉽고 빠르게 개발, 변경, 운영할 수
            있는 통합 환경을 제공합니다.
          </p>

          <div className="grid gap-16 lg:grid-cols-2">
            <div className="w-full max-w-7xl">
              <Image
                src="/image/corecode_overview_2.png"
                alt="corecode_overview_2"
                width={1121}
                height={1054}
                className="h-auto w-full"
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="inline-block rounded-full bg-rhistle px-5 py-2 font-semibold text-white">
                  Highlights
                </p>

                <ul className="space-y-4">
                  {highlights.map((item) => (
                    <li key={item.title}>
                      <p className="font-bold">{item.title}</p>
                      <ul className="pl-4 text-base">
                        {item.details.map((detail) => (
                          <li key={detail}>- {detail}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="inline-block rounded-full bg-rhistle px-5 py-2 font-semibold text-white">
                  Functionality
                </p>

                <ul className="space-y-2 text-base">
                  {functionalities.map((func) => (
                    <li key={func}>{func}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">Key Features</p>
          <p>
            모델링 (Modeling, Low-Code) 기반의 개발 방법으로 개발 생산성이 높으며, 대용량 데이터를
            빠르고 안정적으로 처리하고, 데이터 연계 환경 변화에 유연하게 대응할 수 있습니다.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {performanceData.map((item) => (
              <div
                key={item.title}
                className="space-y-4 rounded-3xl border border-gray-100 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="inline-block rounded-full bg-rhistle px-3 py-1 text-white">
                    {item.badge}
                  </p>
                  <p className="font-semibold text-rhistle">{item.title}</p>
                </div>
                <ul className="space-y-2 text-base">
                  {item.descriptions.map((desc) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">Business Benefits</p>
          <p>
            CoreCode 솔루션 도입을 통해 제조의 가치를 제고하고, 제조 운영 및 관리 역량을 강화하여
            지속적으로 성과를 개선할 수 있습니다.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {effectData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="space-y-10 rounded-3xl border border-gray-100 p-6 shadow-sm"
                >
                  <p className="text-center font-semibold">
                    {item.title}
                    <br />
                    <span className="text-rhistle">{item.highlight}</span>
                  </p>

                  <div className="flex justify-center">
                    <Icon className="h-8 w-8 text-rhistle" />
                  </div>

                  <ul className="space-y-2 text-base">
                    {item.descriptions.map((desc) => (
                      <li key={desc}>{desc}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">Functionalities</p>
          <p>
            개발, 테스트, 배포, 운영 및 모니터링 등 시스템 개발 전체 단계를 지원할 수 있는 기능으로
            구성되어 있습니다.
          </p>
          <div className="flex w-full flex-col gap-4">
            {features.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 shadow-sm transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-col p-6 sm:p-8">
                  {/* 헤더 부분 (항상 보임) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="font-black text-rhistle/30 transition-colors duration-500 group-hover:text-rhistle">
                        {item.id}
                      </span>
                      <h3 className="font-bold">{item.title}</h3>
                    </div>

                    <div className="relative h-6 w-6">
                      <span className="absolute inset-0 m-auto h-0.5 w-4 bg-gray-400 transition-transform duration-500 group-hover:rotate-180" />
                      <span className="absolute inset-0 m-auto h-4 w-0.5 bg-gray-400 transition-transform duration-500 group-hover:rotate-90 group-hover:opacity-0" />
                    </div>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {item.desc.map((line) => (
                          <li
                            key={line}
                            className="flex items-center gap-3 opacity-0 transition-all delay-100 duration-700 group-hover:opacity-100"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rhistle" />
                            <span className="leading-relaxed">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">Applications</p>
          <p>
            데이터 연계 솔루션으로 비즈니스 요구에 따라 스마트팩토리 구축, 환경/안전 관제, IoT
            Platform 구성 등 다양하 게 활용할 수 있습니다.
          </p>
          <div className="w-full max-w-7xl">
            <Image
              src="/image/corecode_applications.png"
              alt="corecode_applications"
              width="1224"
              height="498"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <CallToAction href="/pdf/CoreCode_Brochure.pdf" name="corecode" />
    </main>
  );
};
export default page;
