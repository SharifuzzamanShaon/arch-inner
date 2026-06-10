import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#383636] text-white hover:bg-black",
  outline:
    "border border-[#383636] text-[#383636] bg-transparent hover:bg-[#383636] hover:text-white",
  ghost: "bg-transparent text-[#383636] hover:bg-[#383636]/8",
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
        "inline-flex items-center justify-center rounded-none text-sm font-light tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#383636] focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className,
      )}
      {...props}
    />
  );
}
