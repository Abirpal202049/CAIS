"use client";
import Custom_Tab from "@/components/common/Custom_Tab";
import Custom_Table from "@/components/common/Custom_Table";
import { formatDate } from "@/utils/formatData";
import axios from "axios";
import React from "react";

type Props = {
  params: {
    tabSlug: string;
  };
};

export default function AlertDetailsPage({ params }: Props) {
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
      {params.tabSlug === "alert_details" && <Alert_Details />}
      {params.tabSlug === "position" && <Position />}
      {params.tabSlug === "trades" && <Trades />}
      {params.tabSlug === "historical_trades" && <Trades />}
      {params.tabSlug === "prior_alerts" && <Alert_Details />}
      {params.tabSlug === "financial_advisor" && <Financial_Advisors />}
      {params.tabSlug === "other_alerts" && <div>Other Alerts</div>}
    </>
  );
}

function Alert_Details() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");

      setData(res.data.alerts);
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
    <Custom_Table
      tableType="alerts"
      select={true}
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Position() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/6f33ea27b8ac14ac49aa");

      setData(res.data);
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
    <Custom_Table
      tableType="alerts"
      select={true}
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Trades() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/65c1706f2f4be7cbc4f8");

      setData(res.data);
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
    <Custom_Table
      tableType="alerts"
      select={true}
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Historical_Trades() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/65c1706f2f4be7cbc4f8");

      setData(res.data);
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
    <Custom_Table
      tableType="alerts"
      select={true}
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}

function Financial_Advisors() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/e31ba500e557b4487e48");

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
    <Custom_Table
      tableType="alerts"
      select={true}
      columnFilter={true}
      data={data}
      handleSwitch={handleSwitch}
    />
  );
}
