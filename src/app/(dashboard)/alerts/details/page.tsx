"use client";
import React from "react";
import MainSection from "@/components/common/Navbar/MainSection";
import Styles from "./Styles.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import Custom_Table from "@/components/common/Custom_Table";
import { formatDate } from "@/utils/formatData";
import axios from "axios";
import Link from "next/link";

const tabsModel = [
  {
    label: "All Alerts",
    value: "Overview",
    count: 0,
  },
  {
    label: "Open Alerts",
    value: "Overview",
    count: 0,
  },
  {
    label: "Closed Alerts",
    value: "Overview",
    count: 0,
  },
];

const AlertSummary = () => {
  const [tabsModel, setTabsModel] = React.useState<
    {
      label: string;
      value: string;
      count: number;
    }[]
  >([]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [data, setData] = React.useState([{}]);
  const [filteredData, setFilteredData] = React.useState([{}]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");
      // console.log(res.data.financial_advisors);
      const countFunc = () => {
        let closed = 0;
        let open = 0;
        res.data.alerts.map((alert: any) => {
          if (alert.state === "Closed") {
            console.log("hello");
            closed++;
          } else {
            open++;
          }
        });
        return [closed, open];
      };

      const [closed, open] = countFunc();
      setTabsModel([
        {
          label: "All Alerts",
          value: "Overview",
          count: res.data.alerts.length,
        },
        {
          label: "Open Alerts",
          value: "Overview",
          count: open,
        },
        {
          label: "Closed Alerts",
          value: "Overview",
          count: closed,
        },
      ]);
      setData(res.data.alerts);
      setFilteredData(data);
    })();
  }, []);

  const handleSwitch = (data: any, field: any) => {
    const renderedData = data[field];
    //   typeof data[field] === "string"
    //     ? data[field].length > 30
    //       ? `${data[field].slice(0, 30)}...`
    //       : data[field]
    //     : data[field];
    console.log(renderedData);
    switch (field) {
      case "create_date":
      case "business_date":
        return <div>{formatDate(data[field])}</div>;
      case "alert_id":
        return (
          <Link
            href={`/alerts/details/${data.alert_id}`}
            className="text-brand"
          >
            {data[field]}
          </Link>
        );
      default:
        return <div>{renderedData}</div>;
    }
  };

  return (
    <div className={Styles.alert_main_section}>
      <h1 className="Page_Heading" style={{ padding: "1rem .5rem" }}>
        Alert Summary
      </h1>
      {/*  Custom Tab */}
      <Custom_Tab
        TabsModel={tabsModel}
        selectedTabIndex={tabIndex}
        setSelectedTabIndex={setTabIndex}
      />

      {/*  Custom Table */}
      <Custom_Table
        tableHeading={
          tabIndex < tabsModel.length ? tabsModel[tabIndex].label : ""
        }
        columnFilter
        data={data}
        handleSwitch={handleSwitch}
        ScrollHeight="calc(100vh - 300px)"
        ResizableColumns
        select
        exportable
      />
    </div>
  );
};

export default AlertSummary;
