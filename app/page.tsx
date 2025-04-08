"use client"

import { useTheme } from "next-themes";

export default function Page() {
  const { setTheme } = useTheme();

  return(
    <div className="flex flex-col">
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  )
}
