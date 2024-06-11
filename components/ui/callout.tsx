"use client";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";
import React, { useState } from "react";

const callOutVariants = cva(
  `flex w-full items-center text-sm font-[450] gap-3 rounded-md px-4 py-3 transition-colors`,
  {
    variants: {
      variant: {
        default:
          "bg-muted-700/10 text-muted-700 dark:bg-muted-700/20 dark:text-muted-500/80 selection:bg-muted-700/30 hover:[&_button]:text-muted-600 hover:[&_button]:bg-muted-700/10",
        info: "bg-info-700/10 text-info-700 dark:bg-info-700/20 dark:text-info-500/80 selection:bg-info-700/30 hover:[&_button]:text-info-600 hover:[&_button]:bg-info-700/10",
        success:
          "bg-success-700/10 text-success-700 dark:bg-success-700/20 dark:text-success-500/80 selection:bg-success-700/30 hover:[&_button]:text-success-700/80 hover:[&_button]:bg-success-700/10",
        warning:
          "bg-warning-700/10 text-warning-700 dark:bg-warning-700/20 dark:text-warning-500/80 selection:bg-warning-700/30 hover:[&_button]:text-warning-600 hover:[&_button]:bg-warning-700/10",
        danger:
          "bg-destructive-700/20 text-destructive-600 dark:bg-destructive-700/20 dark:text-destructive-500/80 selection:bg-destructive-700/30 hover:[&_button]:text-destructive-500 hover:[&_button]:bg-destructive-700/10",
      },
    },
    defaultVariants: {
      variant: "danger",
    },
  },
);

export interface CallOutProps extends VariantProps<typeof callOutVariants> {
  className?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
}

const Callout = ({
  variant,
  className,
  showCloseButton,
  children,
}: CallOutProps) => {
  let [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className={cn(
        callOutVariants({ variant }),
        "flex items-center justify-between gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">{children}</div>
      {showCloseButton && (
        <button
          onClick={() => setVisible(false)}
          type="button"
          className="ml-auto flex h-7 border border-transparent focus-visible:border-border w-7 flex-shrink-0 items-center justify-center rounded-sm p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:border focus-visible:ring-offset-1 focus-visible:ring-current"
        >
          <Cross1Icon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default Callout;
