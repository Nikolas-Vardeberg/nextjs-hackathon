import { useState, useEffect } from "react";

export type TabType = "destinations" | "rentals";

export default function useTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("destinations");

  useEffect(() => {
    const savedTab =
      typeof window !== "undefined"
        ? (localStorage.getItem("vacation-focus") as TabType)
        : null;
    setActiveTab(savedTab || "destinations");
  }, []);

  const handleTabChange = (value: string) => {
    const tab = value as TabType;
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("vacation-focus", tab);
    }
  };

  return {
    activeTab,
    handleTabChange,
  };
}
