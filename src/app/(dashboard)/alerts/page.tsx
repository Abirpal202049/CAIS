import React from "react";
import Custom_Tab from "@/components/common/Custom_Tab";

type Props = {};

export default function AlertPage({}: Props) {
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
    <div>
      <Custom_Tab TabsModel={TabsModel} />
    </div>
  );
}
