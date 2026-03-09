"use client";

import { useInView } from "react-intersection-observer";

const history = [
  {
    date: "2025년",
    items: [
      "Vexi (관제 DT 솔루션) 출시 예정",
      "Nexumm (제조 IT Framework) 출시",
      "셀트리온 제약 CoreCode Suite 공급",
    ],
  },
  {
    date: "2024년",
    items: [
      "CoreCode Suite V5 출시",
      "스마트팩토리 사업 확대 (컨설팅, 시스템 구축)",
    ],
  },
  {
    date: "2023년",
    items: ["LG전자 CoreCode Suite 공급", "LS티라유텍 전략적 제휴 체결"],
  },
  {
    date: "2022년",
    items: ["LGCNS 협력업체 선정"],
  },
  {
    date: "2020년",
    items: ["SK 하이닉스 CoreCode Suite 공급", "셀트리온 CoreCode Suite 공급"],
  },
  {
    date: "2018년",
    items: ["기아자동차 CoreCode Suite 공급", "현대제철 CoreCode Suite 공급"],
  },
  {
    date: "2017년",
    items: ["현대자동차 CoreCode Suite 공급"],
  },
  {
    date: "2016년",
    items: ["현대오토에버 협력업체 선정", "한화오션 CoreCode 공급"],
  },
  {
    date: "2015년",
    items: ["SK AX 협력업체 선정"],
  },
  {
    date: "2014년",
    items: ["CoreCode Suite GS 인증"],
  },
  {
    date: "2013년",
    items: ["CoreCode XSTORE GS 인증"],
  },
  {
    date: "2012년",
    items: [
      "포스코, 포스하이메탈 CoreCode Suite 공급",
      "대법원 CoreCode XSTORE 공급",
    ],
  },
  {
    date: "2011년",
    items: ["포스크DX 협력업체 선정", "삼성전자 CoreCode 공급"],
  },
  {
    date: "2010년",
    items: [
      "삼성SDI CoreCode Suite 공급",
      "코닝정밀소재 CoreCode Suite 공급",
      "삼성디스플레이 CoreCode Suite 공급",
    ],
  },
  {
    date: "2009년",
    items: ["삼성 SDS 협력업체 선정"],
  },
  {
    date: "2008년",
    items: ["기술혁신형 중소기업(INNO-BIZ) 인증 (중소벤처기업부)"],
  },
  {
    date: "2007년",
    items: [
      "통합 인터페이스 장치 특허 출원",
      "CoreCode Suite V4 (인터페이스 미들웨어) 출시",
    ],
  },
  {
    date: "2006년",
    items: [
      "CoreCode XSTORE (XML 문서관리 소프트웨어)' 출시",
      "SK 하이닉스 중국 우시 CoreCode Suite 공급",
      "CoreCode Suite (인터페이스 미들웨어 )' 출시",
      "기업부설연구소 설립",
      "우량기술기업 선정",
    ],
  },
  {
    date: "2005년",
    items: ["(주)나무아이앤씨 설립"],
  },
];

const History = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="grid grid-cols-2 space-y-6 py-16">
      <div
        className={`${inView ? "sticky top-21.25" : ""} space-x-4 self-start`}
      >
        <p className="font-medium text-gray-500 text-xl">Company History</p>
        <h2 className="break-keep font-bold text-5xl">리슬이 걸어온 길</h2>
        <p className="mt-4 max-w-xs text-gray-600 leading-relaxed">
          2005년 설립 이후 리슬은 데이터 기술을 기반으로 제조 현장과 기업
          시스템을 연결하며 성장해왔습니다. 다양한 산업 현장에서 축적된 경험을
          바탕으로 디지털 혁신의 여정을 이어가고 있습니다.
        </p>
      </div>

      <div className="space-y-12 py-2">
        {history.map((year) => (
          <div key={year.date}>
            <div className="font-bold text-2xl text-gray-900">{year.date}</div>

            <ul className="space-y-2 text-gray-600">
              {year.items.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
export default History;
