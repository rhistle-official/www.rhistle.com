import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("eyebrow", className)}>{children}</p>
);
export default Eyebrow;
