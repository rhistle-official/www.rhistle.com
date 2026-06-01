import { cn } from "@/lib/utils";

/** 인더스트리얼 그리드 라인 오버레이. 부모는 relative여야 함. */
const GridLines = ({
  tone = "light",
  className,
}: {
  tone?: "light" | "onDark";
  className?: string;
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0",
      tone === "onDark" ? "opacity-[0.15]" : "opacity-100",
      className,
    )}
    style={{
      backgroundImage:
        tone === "onDark"
          ? "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)"
          : "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}
  />
);
export default GridLines;
