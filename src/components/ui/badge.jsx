import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-#FE5443 text-white hover:bg-orange-600",
  secondary: "bg-white/10 text-white border border-white/20",
  outline: "border border-#FE5443 text-#FE5443 bg-transparent",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}

