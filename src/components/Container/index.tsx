import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto md:px-4 p-2 md:py-6 w-[100vw] lg:w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
