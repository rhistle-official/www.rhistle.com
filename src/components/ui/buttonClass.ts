import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  link: "inline-flex items-center gap-1 font-semibold text-rhistle hover:text-brand-700",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(variantClass[variant], className);
