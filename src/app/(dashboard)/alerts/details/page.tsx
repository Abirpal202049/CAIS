"use client";
import React from "react";
import MainSection from "@/components/common/Navbar/MainSection";
import Styles from "./Styles.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import Custom_Table from "@/components/common/Custom_Table";
import { formatDate } from "@/utils/formatData";
import axios from "axios";

const tabsModel = [
  {
    label: "All Alerts",
    value: "Overview",
    count: 10,
  },
  {
    label: "Open Alerts",
    value: "Overview",
    count: 5,
  },
  {
    label: "Closed Alerts",
    value: "Overview",
    count: 5,
  },
];

const AlertSummary = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [data, setData] = React.useState([{}]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/e31ba500e557b4487e48");
      // console.log(res.data.financial_advisors);

      setData(res.data.financial_advisors);
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
        return <div>{formatDate(data.create_date)}</div>;
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
        tableType="alerts"
        columnFilter={true}
        data={data}
        handleSwitch={handleSwitch}
        ScrollHeight="calc(100vh - 300px)"
        ResizableColumns={true}
      />
    </div>
  );
};

export default AlertSummary;
