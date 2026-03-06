import {
  BatteryCharging,
  Building2,
  Car,
  ClipboardCheck,
  Cpu,
  FlaskConical,
  Lightbulb,
  Shield,
  ShieldAlert,
  Target,
  Warehouse,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import bannerImg from "../../../../public/images/company.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  return {
    title: t("title"),
    description: "리슬을 소개하는 페이지입니다.",
  };
}

const industries = [
  {
    title: "반도체 및 디스플레이",
    engTitle: "Semiconductor & Display",
    icon: <Cpu className="h-12 w-12 text-blue-600" />,
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
    icon: <BatteryCharging className="h-12 w-12 text-blue-600" />,
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
    icon: <FlaskConical className="h-12 w-12 text-blue-600" />,
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
    icon: <Car className="h-12 w-12 text-blue-600" />,
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
    icon: <Building2 className="h-12 w-12 text-blue-600" />,
    focus: "안전/환경 시스템 고도화 및 전사 통합 시스템 구축",
    projects: [
      "스마트팩토리 구축 컨설팅",
      "FEMS/ERP 데이터 연동 시스템 구축",
      "전사 통합 시스템 고도화",
    ],
  },
];

const cases = [
  {
    id: "Case 01",
    category: "Consulting",
    title: "스마트팩토리 컨설팅",
    subtitle: "A 제조사 스마트팩토리 로드맵 수립",
    icon: <ClipboardCheck className="h-8 w-8 text-blue-600" />,
    challenge: "시스템 기반 운영 경험 부재 및 데이터 관리 추진 방향 설정 필요",
    solutions: [
      "OT/IT/AT 통합 컨설팅 서비스 제공",
      "현장 진단을 통한 데이터 수집/분석/활용 로드맵 수립",
      "혁신 과제 추진 전략 및 단계별 추진 계획 수립",
    ],
    results: [
      "생산성 30% 증가 목표 수립",
      "품질 44% 향상 기반 마련",
      "전사적 DX 전환 기반 구축",
    ],
  },
  {
    id: "Case 02",
    category: "Solution",
    title: "WMS(창고관리시스템) 구축",
    subtitle: "원자재/완제품/VMI 창고 통합 관리",
    icon: <Warehouse className="h-8 w-8 text-blue-600" />,
    challenge: "실시간 재고 추적 및 위치 관리 미흡, 규제 대응력 강화 필요",
    solutions: [
      "창고 운영 프로세스 및 기준정보 표준화",
      "Cloud 기반의 글로벌 확산형 WMS 구축",
      "Value Added Service(조립/소진 등) 기능 개발",
    ],
    results: [
      "재고 가시성(Visibility) 강화",
      "공급망 대응 및 운영 효율 제고",
      "규제 준수 및 대응력 강화",
    ],
  },
  {
    id: "Case 03",
    category: "Platform",
    title: "통합 방재 모니터링 시스템",
    subtitle: "A 제조사 선진 방재 시스템 구축",
    icon: <ShieldAlert className="h-8 w-8 text-blue-600" />,
    challenge: "유관 시스템 간 연계 부재로 위기 대응 속도 저하 및 비용 증가",
    solutions: [
      "화재/가스/온도 센서 및 CCTV 실시간 연동",
      "CoreCode Enterprise Suite 기반 통합 모니터링",
      "설비 알람 통계 분석을 통한 사전 예방 체계 구축",
    ],
    results: [
      "운영 비용 연간 76억 절감",
      "운영 효율화 50% 향상",
      "실시간 재해 감지 및 조기 대응",
    ],
  },
  {
    id: "Case 04",
    category: "Automation",
    title: "스마트팩토리 설비 자동화",
    subtitle: "양방향 실시간 데이터 연동 체계",
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    challenge: "대량 데이터의 실시간 처리 및 제조 환경 변화에 대한 유연한 대응",
    solutions: [
      "모델링 기반의 설비별 표준 Adaptor 적용",
      "Plant Floor 데이터 수집 표준 체계 구축",
      "신제조시스템(MES/품질관리) 양방향 실시간 연계",
    ],
    results: [
      "설비 자동화 구축 시간 34% 단축",
      "시스템 장애 Near to Zero 달성",
      "Lot 기반 전 공정 품질 추적",
    ],
  },
];

const page = () => {
  return (
    <main>
      {/* 배너 영역 */}
      <section className="relative h-100">
        <Image
          src={bannerImg}
          alt="company-banner"
          fill
          sizes="100vw"
          className="object-cover brightness-70"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-bold text-2xl text-white md:text-3xl lg:text-5xl">
            회사소개
          </p>
        </div>
      </section>

      {/* 본문 */}
      <div className="mx-auto max-w-7xl px-8">
        <section className="space-y-8 break-keep py-32 text-center leading-tight">
          <h1>
            {/* 상단: 기업의 역할 정의 */}
            <p className="block font-semibold text-4xl text-gray-800">
              <span className="font-bold text-rhistle">리슬</span>은 데이터 기술
              역량을 바탕으로
            </p>

            {/* 중단: 주요 서비스 영역 (Highlight) */}
            <p className="block font-extrabold text-5xl text-gray-900 leading-normal tracking-tight">
              제조 현장부터 통합 물류, <br />
              고객 접점 및 업무 효율까지 가치를 선도하는 <br />
              <span className="text-rhistle">디지털 전환(DX) 전문기업</span>
              입니다.
            </p>

            {/* 하단: 품질 및 신뢰성 강조 (Sub-text) */}
            <span className="block font-normal text-2xl text-gray-500">
              품질이 검증된 솔루션과 고도의 기술력을 기반으로 <br />
              최고의 IT 서비스를 약속합니다.
            </span>
          </h1>
        </section>

        <section className="space-y-6 py-16">
          <div className="space-x-4">
            <p className="font-medium text-gray-500 text-xl tracking-tight">
              Company Values
            </p>
            <h2 className="break-keep font-bold text-5xl leading-tight">
              리슬이 지향하는 미래
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-10 shadow-sm">
            <Lightbulb className="absolute right-0 bottom-0 h-35 w-35 text-blue-100 opacity-50" />
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-bold text-2xl text-blue-900">
                <span className="h-8 w-2 rounded-full bg-rhistle" />
                Vision
              </h3>
              <p className="break-keep text-gray-700 text-xl leading-relaxed">
                "데이터와 기술로 진화하는 디지털 혁신의 리더"
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-10 shadow-sm">
            <Target className="absolute right-0 bottom-0 h-35 w-35 text-blue-100 opacity-50" />
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-bold text-2xl text-blue-900">
                <span className="h-8 w-2 rounded-full bg-rhistle" />
                Mission
              </h3>
              <p className="break-keep text-gray-700 text-xl leading-relaxed">
                "데이터 통합과 지능형 시스템 구축을 통해 고객과 산업, 세상에
                이로운 변화를 만든다."
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-10 shadow-sm">
            <Shield className="absolute right-0 bottom-0 h-35 w-35 text-blue-100 opacity-50" />
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-bold text-2xl text-blue-900">
                <span className="h-8 w-2 rounded-full bg-rhistle" />
                Core Values
              </h3>

              <div>
                <h4 className="font-bold text-blue-600 text-sm tracking-wide">
                  Expertise
                </h4>
                <p className="break-keep text-gray-700 text-xl leading-relaxed">
                  검증된 솔루션과 고도화된 기술 역량으로 최상의 IT 서비스를
                  제공합니다.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-blue-600 text-sm tracking-wide">
                  Agility
                </h4>
                <p className="break-keep text-gray-700 text-xl leading-relaxed">
                  변화하는 환경에 민첩하게 대응하며 실행력 중심의 혁신을
                  선도합니다.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-blue-600 text-sm tracking-wide">
                  Human-Centric
                </h4>
                <p className="break-keep text-gray-700 text-xl leading-relaxed">
                  '리(利)롭게 슬기롭게'의 가치 아래 사람을 위한 기술을
                  추구합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 py-16">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-500 text-xl tracking-tight">
              Industry Served
            </p>
            <h2 className="break-keep font-bold text-5xl leading-tight">
              다양한 제조 산업의 <br />
              디지털 전환을 함께합니다
            </h2>
          </div>

          <div className="space-y-12">
            {industries.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-2 rounded-3xl border border-gray-100 p-10 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex">
                    <div className="rounded-2xl bg-blue-50 p-4 shadow-sm">
                      {item.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-3xl text-gray-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-semibold text-blue-600/80 text-sm tracking-widest">
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
                  <ul className="space-y-6">
                    {item.projects.map((project) => (
                      <li
                        key={project}
                        className="flex items-center gap-3 break-keep text-gray-700 text-xl leading-relaxed"
                      >
                        {/* 점(dot)이 텍스트 첫 줄 중앙에 오도록 mt 조정 */}
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 py-16">
          {/* Header */}
          <div className="space-x-4">
            <h2 className="font-medium text-gray-500 text-xl tracking-tight">
              Business Cases
            </h2>
            <p className="break-keep font-bold text-5xl leading-tight">
              디지털 전환 성공 사례
            </p>
          </div>

          {/* Case Cards */}
          <div className="grid gap-12 lg:grid-cols-2">
            {cases.map((item) => (
              <div
                key={item.id}
                className="space-y-8 overflow-hidden rounded-3xl border border-gray-100 p-10 shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-400">{item.id}</p>
                  <h3 className="font-bold text-3xl text-gray-900">
                    {item.title}
                  </h3>
                  <p className="font-medium text-gray-600 text-lg">
                    {item.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold tracking-widest">Challenge</h4>
                    <p className="break-keep font-medium text-gray-700 leading-relaxed">
                      "{item.challenge}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-blue-600 tracking-widest">
                      Solutions
                    </h4>
                    <ul className="grid gap-3">
                      {item.solutions.map((sol) => (
                        <li
                          key={sol}
                          className="flex items-start gap-3 text-gray-600 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="\">
                    <h4 className="font-bold tracking-widest">
                      Results & Benefits
                    </h4>
                    <div className="space-y-3">
                      {item.results.map((result) => (
                        <div key={result}>
                          <p className="break-keep font-bold text-gray-800 leading-relaxed">
                            {result}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="border-gray-200 border-t">
        <div className="mx-auto flex max-w-7xl justify-between px-8 py-20 text-2xl">
          <p>성공적인 DX 전환, 리슬이 함께하겠습니다.</p>
          <div className="space-x-2">
            <button
              type="button"
              className="cursor-pointer rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
            >
              회사소개서 다운로드
            </button>
            <Link
              href={"/inquiry"}
              className="rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
export default page;
