"use client";
import React from "react";
import Custom_Tab from "@/components/common/Custom_Tab";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabsModel = [
    {
      label: "Alert Details",
      value: "Overview",
      count: 6,
      redirect: "alert_details",
    },
    { label: "Position", value: "Position", redirect: "position" },
    { label: "Trades", value: "Trades", redirect: "trades" },
    {
      label: "Historical Trades",
      value: "Historical Trades",
      redirect: "historical_trades",
    },
    { label: "Prior Alerts", value: "Prior Alerts", redirect: "prior_alerts" },
    {
      label: "Financial Advisor",
      value: "Financial Advisor",
      redirect: "financial_advisor",
    },
    {
      label: "Other AML Related Alerts",
      value: "Other AML Related Alerts",
      redirect: "other_alerts",
    },
  ];
  return (
    <>
      <Custom_Tab
        TabsModel={tabsModel}
        selectedTabIndex={tabIndex}
        setSelectedTabIndex={setTabIndex}
      />
      {children}
    </>
  );
}
