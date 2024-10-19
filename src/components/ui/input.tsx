import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: "amount" | "profile";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputType, type, ...props }, ref) => {
    return (
      <div>
        {inputType === "amount" ? (
          <div className="flex items-center gap-2 px-3 rounded-sm border">
            <span className="sr-only">Currency symbol</span>
            <span className="w-8 px-2">$</span>
            <span className="bg-gray-300 w-[1px] h-8"></span>
            <input
              type={type}
              className={cn(
                "flex h-12 w-full rounded-sm px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
              ref={ref}
              {...props}
            />
          </div>
        ) : inputType === "profile" ? (
          <div className="flex items-center gap-2 px-3 rounded-sm border">
            <input
              type={type}
              className={cn(
                "flex h-12 w-full rounded-sm px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
              ref={ref}
              {...props}
            />
            <span className="bg-gray-300 w-[1px] h-8"></span>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (ref && typeof ref === "object" && ref.current) {
                  ref.current.value = "";
                }
              }}
            >
              <span className="sr-only">Remove</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-sm bg-gray-100 border px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
