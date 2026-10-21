import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/icon.png"
      width={22}
      height={22}
      alt=""
      aria-hidden="true"
      className={cn("size-[22px] shrink-0 object-contain", className)}
    />
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
