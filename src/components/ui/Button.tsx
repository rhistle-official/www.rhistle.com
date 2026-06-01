import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  link: "inline-flex items-center gap-1 font-semibold text-rhistle hover:text-brand-700",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; children: ReactNode };

const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => (
  <button className={cn(variantClass[variant], className)} {...props}>
    {children}
  </button>
);

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(variantClass[variant], className);

export default Button;
