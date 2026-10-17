import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-[22px]", className)}
    >
      <rect
        x="1.25"
        y="1.25"
        width="21.5"
        height="21.5"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path d="M5.5 8.25H18.5" stroke="currentColor" strokeWidth="1" />
      <path d="M5.5 12H14.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5.5 15.75H18.5"
        stroke="var(--color-copper)"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-baseline gap-2 font-display text-[15px] font-semibold tracking-[0.26em] text-fg",
        className,
      )}
    >
      DACOT
      <span className="mb-[3px] block size-[4px] bg-copper" aria-hidden="true" />
    </span>
  );
}
