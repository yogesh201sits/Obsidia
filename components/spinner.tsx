"use client";

import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface SpinnerProps
  extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const Spinner = ({
  size,
  className,
}: SpinnerProps) => {
  return (
    <Loader2
      className={cn(
        spinnerVariants({ size }),
        className
      )}
    />
  );
};