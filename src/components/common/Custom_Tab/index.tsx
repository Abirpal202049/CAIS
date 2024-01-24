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
    { label: "Overview", value: "Overview" },
    { label: "Lineage", value: "Lineage" },
    { label: "Alerts", value: "Alerts" },
    { label: "Activity", value: "Activity" },
    { label: "Discssions", value: "Discssions" },
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
