import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#0A3323] text-white hover:bg-[#0E4430]",
        secondary:
          "bg-gray-100 text-gray-800 hover:bg-gray-200",
        delivered:
          "bg-[#E8F7EE] text-[#0F7638] font-medium border border-[#C5ECD4]",
        inTransit:
          "bg-[#E6F0EB] text-[#0A3323] font-medium border border-[#C2DCCE]",
        pending:
          "bg-[#FFF7ED] text-[#C2410C] font-medium border border-[#FFEDD5]",
        pickedUp:
          "bg-[#FEF3C7] text-[#B45309] font-medium border border-[#FDE68A]",
        cancelled:
          "bg-[#FEE2E2] text-[#B91C1C] font-medium border border-[#FECACA]",
        outline:
          "text-gray-700 border border-gray-200",
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
