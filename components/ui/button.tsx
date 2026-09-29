import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#014D21] text-white hover:bg-[#01451E] active:bg-[#013A19] shadow-sm font-semibold",
        accent:
          "bg-[#DC851F] text-white hover:bg-[#C6771B] active:bg-[#A86517] shadow-sm font-semibold",
        secondary:
          "bg-white text-gray-700 border border-[#E3E3DC] hover:bg-[#F7F7F3] active:bg-[#F0F0EB]",
        outline:
          "border border-[#E3E3DC] bg-transparent hover:bg-[#F7F7F3] text-gray-700",
        ghost:
          "hover:bg-[#F0F0EB] text-gray-700",
        destructive:
          "bg-[#C83B2B] text-white hover:bg-[#B42318] shadow-sm",
        link:
          "text-[#014D21] underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
