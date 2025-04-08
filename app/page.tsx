"use client"

import { Button } from "@/common/components/ui/Button/Button";
import { useTheme } from "next-themes";

export default function Page() {
  const { setTheme } = useTheme();

  return(
    <div className="flex flex-col gap-8 max-w-[200px]">
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <Button>
        Hei
      </Button>
    </div>
  )
}
