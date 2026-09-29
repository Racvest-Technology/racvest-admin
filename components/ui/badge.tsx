import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#014D21] text-white hover:bg-[#01451E]",
        secondary:
          "bg-[#F0F0EB] text-[#171713] hover:bg-[#E3E3DC]",
        delivered:
          "bg-[#ECFDF3] text-[#15803D] font-medium border border-[#D1FAE0]",
        inTransit:
          "bg-[#E6F1EB] text-[#014D21] font-medium border border-[#9BC7AD]",
        pending:
          "bg-[#FFF8E7] text-[#B45309] font-medium border border-[#FDECC8]",
        pickedUp:
          "bg-[#FFF4E5] text-[#DC851F] font-medium border border-[#F8D19A]",
        cancelled:
          "bg-[#FEF2F0] text-[#B42318] font-medium border border-[#FDE0DB]",
        outline:
          "text-[#171713] border border-[#E3E3DC]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
