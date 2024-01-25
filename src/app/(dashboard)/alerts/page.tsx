import MainSection from "@/components/common/Navbar/MainSection";
import React from "react";
import Styles from "./Styles.module.scss";
import Custom_Tab from "@/components/common/Custom_Tab";
import Custom_Table from "@/components/common/Custom_Table";
import { formatDate } from "@/utils/formatData";
import axios from "axios";

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

const Page = () => {
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
    switch (field) {
      case "create_date":
        return <div>{formatDate(data.create_date)}</div>;
      default:
        return <div>{data[field]}</div>;
    }
  };

  return (
    <div className={Styles.alert_main_section}>
      {/*  Top Navbar */}
      <MainSection />

      {/*  Custom Tab */}
      <Custom_Tab
        TabsModel={tabsModel}
        selectedTabIndex={tabIndex}
        setSelectedTabIndex={setTabIndex}
      />

      {/*  Custom Table */}
      <Custom_Table
        tableType="alerts"
        select={true}
        columnFilter={true}
        data={data}
        handleSwitch={handleSwitch}
      />
    </div>
  );
};

export default Page;
