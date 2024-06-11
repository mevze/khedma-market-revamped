import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border-[1.5px] border-input bg-transparent px-3 py-1 text-sm shadow-[hsl(var(--input))_0px_0px_0px_0.5px,_rgba(0,_0,_0,_0.07)_0px_0px_0.5px_0px] transition-input ease-ease file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-ring/20 focus-visible:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive-500/90 aria-[invalid=true]:focus-visible:ring-destructive-500/20",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
