"use client";

import { useState } from "react";

export default function SkipMain() {
  const [visible, setVisible] = useState(false);

  return (
    <a
      href="#main-content"
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      className={`absolute left-4 top-4 z-50 rounded bg-primary px-4 py-2 text-white transition-opacity duration-200 focus:outline-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      Skip to main content
    </a>
  );
}
