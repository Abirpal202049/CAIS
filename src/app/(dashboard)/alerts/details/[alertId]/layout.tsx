"use client";
import React, { useEffect, useState } from "react";
import Custom_Tab from "@/components/common/Custom_Tab";
import Information from "./_components/Information";
import styles from "./alertId.module.scss";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BreadCrumb } from "primereact/breadcrumb";
import {
  FilePlus,
  Paperclip,
  Users,
  History,
  MoreHorizontal,
} from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [data, setData] = useState([{}]);
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
      <Menu alertId={pathName.split("/")[3]} />
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

const Menu = ({ alertId }: { alertId: string }) => {
  const items = [
    { label: "ALERTS", url: "/alerts/details" },
    { label: "ALERT ID " + alertId },
    { label: "" },
  ];

  return (
    <div className={styles.menuBar}>
      <BreadCrumb model={items} className={styles.breadcrumb} />
      <div className={styles.menuButtons}>
        <span>
          <Paperclip />
        </span>
        <span>
          <FilePlus />
        </span>
        <span>
          <Users />
        </span>
        <span>
          <History />
        </span>
        <span>
          <MoreHorizontal />
        </span>
      </div>
    </div>
  );
};
