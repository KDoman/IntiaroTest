import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useGetCurrentTab(tabs) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const location = useLocation();

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  return [activeTab, setActiveTab];
}
