import { ClipboardCheck, ShieldAlert, Warehouse, Zap } from "lucide-react";

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

const BusinessCase = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-8 py-20">
      <div className="space-y-4">
        <h2 className="font-medium text-gray-500 text-xl">Business Cases</h2>
        <p className="break-keep font-bold text-5xl">디지털 전환 성공 사례</p>
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
              <h3 className="font-bold text-3xl text-gray-900">{item.title}</h3>
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
  );
};
export default BusinessCase;
