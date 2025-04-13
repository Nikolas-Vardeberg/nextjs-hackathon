"use client";

import { useAuthContextHook } from "@/common/providers/use-auth-context";
import clsx from "clsx";

const HighlightBar = () => {
  const { currentStep } = useAuthContextHook();

  return (
    <div className="grid grid-cols-3 max-w-56 mx-auto gap-3 w-full">
      <div
        className={clsx(
          "rounded-full h-2 col-span-1",
          currentStep == 1 ? "bg-orange-500" : "bg-gray-400",
        )}
      />
      <div
        className={clsx(
          "rounded-full h-2 col-span-1",
          currentStep == 2 ? "bg-orange-500" : "bg-gray-400",
        )}
      />
      <div
        className={clsx(
          "rounded-full h-2 col-span-1",
          currentStep == 3 ? "bg-orange-500" : "bg-gray-400",
        )}
      />
    </div>
  );
};

export default HighlightBar;
