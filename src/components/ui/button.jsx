import { cn } from "@/lib/utils";

const variants = {
  default: "bg-#FE5443 text-white hover:bg-orange-600",
  outline:
    "border border-#FE5443 text-#FE5443 bg-transparent hover:bg-orange-50",
  ghost: "bg-transparent text-#FE5443 hover:bg-orange-50",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-6 text-base",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-#FE5443 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className,
      )}
      {...props}
    />
  );
}
