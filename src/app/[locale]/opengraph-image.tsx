import { ImageResponse } from "next/og";

export const alt = "RHISTLE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #1428a0 0%, #070d3d 100%)",
        color: "#fff",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.03em" }}>RHISTLE</div>
      <div style={{ fontSize: 40, marginTop: 24, opacity: 0.8 }}>
        Manufacturing Intelligence Solutions
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>,
    { ...size },
  );
}
