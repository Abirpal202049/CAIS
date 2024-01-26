"use client";
import React, { useEffect, useState } from "react";
import Custom_Tab from "@/components/common/Custom_Tab";
import Information from "./_components/Information";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [data, setData] = useState([{}]);
  console.log("%%%%%%%%", data);
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  React.useEffect(() => {
    setTabIndex(() => {
      const tabSlug = pathName.split("/")[4];
      return tabsModel.findIndex((tab) => tab.redirect === tabSlug);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.npoint.io/c748243694692e1247ef"
        );
        console.log("8888----", res.data);

        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabsModel = [
    {
      label: "Alert Details",
      value: "Overview",
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

      <Information data={data} loading={loading} />
    </>
  );
}
