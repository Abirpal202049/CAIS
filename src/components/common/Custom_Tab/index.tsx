"use client";
import { TabMenu } from "primereact/tabmenu";
import React from "react";
import styles from "../Custom_Tab/custom_tab.module.scss";

const Custom_Tab: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState("Overview");

  const handleTabChange = (e: any) => {
    setSelectedTabIndex(e.index);
    setSelectedTab(e.value);
  };

  const TabsModel = [
    { label: "Alert Details", value: "Overview" },
    { label: "Position", value: "Position" },
    { label: "Trades", value: "Trades" },
    { label: "Historical Trades", value: "Historical Trades" },
    { label: "Prior Alerts", value: "Prior Alerts" },
    { label: "Financial Advisor", value: "Financial Advisor" },
    { label: "Other AML Related Alerts", value: "Other AML Related Alerts" },
  ];
  return (
    <div className={styles.customTab_container}>
      <TabMenu
        model={TabsModel}
        activeIndex={selectedTabIndex}
        onTabChange={(e) => handleTabChange(e)}
      />
    </div>
  );
};

export default Custom_Tab;
