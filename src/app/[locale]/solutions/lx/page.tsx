import {
  Boxes,
  Crosshair,
  Layers,
  PackageSearch,
  Route,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccordionFeatures from "@/components/AccordionFeatures";
import BenefitCard from "@/components/BenefitCard";
import CallToAction from "@/components/CallToAction";
import FeatureCard from "@/components/FeatureCard";
import NexummSubTab from "@/components/NexummSubTab";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SolutionHero from "@/components/SolutionHero";
import SolutionsTab from "@/components/SolutionsTab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nexumm" });

  return {
    title: t("lx.title"),
    description: t("lx.description"),
  };
}

const highlights = [
  {
    title: "실시간 재고 가시성",
    detail: "로케이션 단위로 수량·상태를 실시간 동기화",
  },
  {
    title: "End-to-End 추적성",
    detail: "Lot·Serial 기반으로 입고부터 출고까지 전 이력 추적",
  },
  {
    title: "ERP 자동 연계",
    detail: "파일 어댑터와 API 폴링 어댑터로 입·출고 지시 자동 수신",
  },
  {
    title: "멀티테넌트 클라우드",
    detail: "회사·창고별 격리 운영, 글로벌 다거점 확산형",
  },
];

const features = [
  {
    badge: "Accurate",
    title: "재고 정확도",
    icon: <Crosshair className="size-6" />,
    descriptions: [
      "바코드 스캔 기반 무오류 현장 작업",
      "실시간 동기화로 장부-실물 재고 일치",
      "가입고로 입고 지연 없이 수량 선반영",
    ],
  },
  {
    badge: "Traceable",
    title: "추적성",
    icon: <Route className="size-6" />,
    descriptions: [
      "Lot·Serial 단위 전 이력 관리",
      "입고→보관→출고 전 과정 추적",
      "규제 대응을 위한 이력 추적성 확보",
    ],
  },
  {
    badge: "Scalable",
    title: "확장성",
    icon: <Layers className="size-6" />,
    descriptions: [
      "멀티테넌트 SaaS 아키텍처",
      "다중 창고·글로벌 다거점 운영",
      "클라우드 기반 빠른 확산",
    ],
  },
];

const functionalities = [
  {
    id: "01",
    title: "입고 관리",
    desc: [
      "ERP 입고 지시 수신",
      "입고 예정 관리",
      "가입고(수량 선반영·로케이션 미배정)",
      "입고 검수",
    ],
  },
  {
    id: "02",
    title: "출고 관리",
    desc: ["ERP 출고 지시 수신", "피킹·패킹", "출고 검증"],
  },
  {
    id: "03",
    title: "재고 관리·추적",
    desc: [
      "로케이션 관리",
      "실시간 재고 현황",
      "Lot·Serial 추적",
      "재고 실사(Cycle Count) 및 조정",
    ],
  },
  {
    id: "04",
    title: "기준정보·동기화",
    desc: ["품목·BOM WMS 동기화(Pull)", "표준 기준정보 관리"],
  },
  {
    id: "05",
    title: "모바일 작업",
    desc: ["PDA 바코드 스캔 기반 현장 작업", "입고·피킹·실사 모바일 지원"],
  },
];

const benefits = [
  {
    title: "재고 가시성 확보로",
    highlight: "재고 정확도 향상",
    icon: <PackageSearch className="size-7" />,
    descriptions: ["실시간 재고로 결품·과재고 방지", "장부 재고 신뢰도 제고", "재고 회전율 개선"],
  },
  {
    title: "작업 효율 제고로",
    highlight: "운영비 절감",
    icon: <TrendingUp className="size-7" />,
    descriptions: ["작업 동선 최적화", "오피킹(오출고) 방지", "바코드 작업으로 처리량 향상"],
  },
  {
    title: "공급망 대응으로",
    highlight: "규제 준수·대응력 강화",
    icon: <Boxes className="size-7" />,
    descriptions: [
      "ERP 연계로 적기 입·출고",
      "이력 추적성 기반 규제 준수",
      "글로벌 다거점 표준 운영",
    ],
  },
];

const applications = [
  "원자재·완제품·VMI 창고",
  "3PL·물류센터",
  "글로벌 다거점 운영",
  "제조-물류 통합 환경",
];

const page = () => {
  return (
    <main>
      <SolutionHero
        code="LX"
        name="Nexumm LX"
        tagline="재고의 모든 순간을 추적하다"
        description="입고부터 출고까지 물류 전 과정을 실시간으로 추적·가시화하는 차세대 창고 관리 시스템(WMS)입니다."
      />

      <SolutionsTab />
      <NexummSubTab />

      <div className="mx-auto max-w-7xl space-y-28 px-8 py-24">
        {/* Overview + Highlights */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="실시간 재고 가시성 기반 WMS"
              description="멀티테넌트·다중 창고 환경에서 재고의 위치·수량·상태를 단일 화면에서 관리하고, ERP와 양방향으로 연계합니다."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="font-bold text-lg text-rhistle">{item.title}</p>
                  <p className="mt-3 text-gray-600">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading eyebrow="Key Features" title="정확하고, 추적 가능하며, 확장된다" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, i) => (
              <FeatureCard
                key={item.title}
                badge={item.badge}
                title={item.title}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Functionalities */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Functionalities"
              title="입고부터 출고까지, 재고 추적의 전 과정"
              description="재고 관리·추적을 중심으로 입고·출고·동기화·모바일 작업까지 창고 운영 전 단계를 지원합니다."
            />
          </Reveal>
          <Reveal>
            <AccordionFeatures items={functionalities} />
          </Reveal>
        </section>

        {/* Business Benefits */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Business Benefits"
              title="재고를 보이게 하면, 비용이 줄어든다"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <BenefitCard
                key={item.highlight}
                title={item.title}
                highlight={item.highlight}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading eyebrow="Applications" title="다양한 창고 운영 환경에 적용" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, i) => (
              <Reveal key={app} delay={i * 0.08}>
                <div className="flex h-full items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <Warehouse className="size-6 shrink-0 text-rhistle" />
                  <span className="font-medium">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <CallToAction />
    </main>
  );
};
export default page;
