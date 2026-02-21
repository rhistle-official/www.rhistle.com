import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*", // 모든 검색 로봇(구글, 네이버 등)에게 적용
        allow: "/", // 기본적으로 모든 페이지 허용
      },
    ],
    sitemap: "https://rhistle.com/sitemap.xml",
  };
};
export default robots;
