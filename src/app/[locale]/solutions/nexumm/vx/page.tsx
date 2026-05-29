import {
  ArrowRight,
  Boxes,
  Cable,
  Eye,
  LayoutDashboard,
  ShieldAlert,
  Siren,
  TrendingUp,
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
    title: t("vx.title"),
    description: t("vx.description"),
  };
}

const highlights = [
  {
    title: "CoreCode 네이티브 연계",
    detail: "100여 종 어댑터로 수집·표준화된 데이터를 즉시 활용",
  },
  {
    title: "디지털 트윈 시각화",
    detail: "현장을 3D로 재현해 설비·구역 상태를 직관적으로 표현",
  },
  {
    title: "실시간 통합 대시보드",
    detail: "설비·환경·안전·에너지 데이터를 단일 화면에서",
  },
  {
    title: "지능형 이상 감지",
    detail: "임계치·패턴 기반 알람으로 조기 경보",
  },
];

const features = [
  {
    badge: "Visible",
    title: "가시성",
    icon: <Eye className="size-6" />,
    descriptions: ["디지털 트윈 3D 시각화", "단일 통합 대시보드", "구역·설비 단위 드릴다운"],
  },
  {
    badge: "Connected",
    title: "연계성",
    icon: <Cable className="size-6" />,
    descriptions: ["CoreCode 기반 즉시 연계", "OPC·Modbus 등 멀티 프로토콜", "이기종 데이터 통합"],
  },
  {
    badge: "Proactive",
    title: "선제 대응",
    icon: <Siren className="size-6" />,
    descriptions: ["실시간 이상 감지", "조기 경보 및 알림", "예지보전 기반 마련"],
  },
];

const functionalities = [
  {
    id: "01",
    title: "데이터 수집·연계",
    desc: ["CoreCode 연동", "표준 프로토콜(OPC·Modbus 등) 수집", "이기종 데이터 통합"],
  },
  {
    id: "02",
    title: "실시간 대시보드",
    desc: ["설비 가동 현황 시각화", "환경·안전 KPI 모니터링", "사용자 정의 대시보드"],
  },
  {
    id: "03",
    title: "디지털 트윈",
    desc: ["3D 현장 모델", "실데이터 매핑", "구역·설비 드릴다운"],
  },
  {
    id: "04",
    title: "이벤트·알람 관리",
    desc: ["임계치·패턴 기반 알람", "이상 감지", "알림 및 대응 이력 관리"],
  },
  {
    id: "05",
    title: "통계·분석",
    desc: ["추세 분석", "가동률·환경 통계", "리포트 생성"],
  },
];

const benefits = [
  {
    title: "통합 가시성으로",
    highlight: "운영·관리 역량 제고",
    icon: <LayoutDashboard className="size-7" />,
    descriptions: [
      "분산 데이터의 단일 관제",
      "실시간 기반 의사결정",
      "디지털 트윈으로 직관적 파악",
    ],
  },
  {
    title: "선제적 위기 대응으로",
    highlight: "안전·안정성 강화",
    icon: <ShieldAlert className="size-7" />,
    descriptions: ["화재·가스·환경 이상 조기 감지", "위기 대응 속도 향상", "사고 사전 예방"],
  },
  {
    title: "데이터 기반 개선으로",
    highlight: "지속적 성과 제고",
    icon: <TrendingUp className="size-7" />,
    descriptions: ["통계·분석으로 문제 식별", "예지보전 기반 마련", "에너지·ESG 성과 개선"],
  },
];

const applications = [
  "스마트팩토리 설비 관제",
  "통합 방재(화재·가스·온도·CCTV)",
  "에너지·환경 모니터링",
  "안전 관제",
];

const page = () => {
  return (
    <main>
      <SolutionHero
        code="VX"
        name="Nexumm VX"
        tagline="데이터를 보이게, 현장을 살아있게"
        description="설비·환경·안전 데이터를 실시간으로 모니터링하고 디지털 트윈으로 시각화하는 통합 관제 솔루션입니다."
      />

      <SolutionsTab />
      <NexummSubTab />

      <div className="mx-auto max-w-7xl space-y-28 px-8 py-24">
        {/* Overview + Highlights */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="실시간 통합 관제 & 디지털 트윈"
              description="CoreCode가 수집·표준화한 데이터를 그대로 받아 한 화면에서 현장을 가시화하고 이상을 조기에 감지합니다."
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

        {/* CoreCode synergy band */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1428a0] to-[#070d3d] p-8 text-white md:p-12">
            <p className="font-semibold text-white/70 text-sm uppercase tracking-widest">
              Synergy with CoreCode
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-2xl bg-white/10 p-6 text-center">
                <p className="font-audiowide text-2xl">CoreCode</p>
                <p className="mt-2 text-white/70">데이터 수집·표준화</p>
              </div>
              <ArrowRight className="mx-auto size-8 rotate-90 sm:rotate-0" />
              <div className="flex-1 rounded-2xl bg-white/20 p-6 text-center">
                <p className="font-audiowide text-2xl">Nexumm VX</p>
                <p className="mt-2 text-white/70">관제·디지털 트윈</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-white/80">
              CoreCode가 모은 설비·센서 데이터를 별도 연계 개발 없이 즉시 받아, VX가 실시간 관제와
              디지털 트윈으로 시각화합니다.
            </p>
          </div>
        </Reveal>

        {/* Key Features */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading eyebrow="Key Features" title="보이고, 연결되고, 앞서 대응한다" />
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
              title="수집부터 분석까지, 통합 관제의 전 과정"
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
              title="보이면 빨라지고, 빨라지면 안전해진다"
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
            <SectionHeading eyebrow="Applications" title="다양한 관제 환경에 적용" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, i) => (
              <Reveal key={app} delay={i * 0.08}>
                <div className="flex h-full items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <Boxes className="size-6 shrink-0 text-rhistle" />
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
