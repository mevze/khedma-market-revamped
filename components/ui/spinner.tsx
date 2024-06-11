import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const spinnerVariants = cva("aspect-square", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-7 h-7",
      xl: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface SpinnerProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  variant?: "default" | "cool";
}
const Spinner = ({
  size,
  className,
  variant = "default",
  ...rest
}: SpinnerProps) => {
  if (variant === "default") {
    return (
      <div className={cn(spinnerVariants({ size, className }))} {...rest}>
        <div className={cn("spinner_wrapper size-full")}>
          <div className="spinner_spinner size-full">
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
            <div className="spinner_bar" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          aria-label="Loading"
          className={cn(
            "relative inline-flex flex-col items-center justify-center gap-2",
            className,
          )}
        >
          <div className="relative flex aspect-square w-full min-w-4">
            <i className="animate-spinner-ease-spin absolute h-full w-full rounded-full border-[1.6px] border-solid border-b-current border-l-transparent border-r-transparent border-t-transparent" />
            <i className="animate-spinner-linear-spin absolute h-full w-full rounded-full border-[1.6px] border-dotted border-b-current border-l-transparent border-r-transparent border-t-transparent opacity-75" />
          </div>
        </div>
      </>
    );
  }
};

export default Spinner;
