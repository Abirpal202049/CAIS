"use client";
import Custom_Tab from "@/components/common/Custom_Tab";
import Custom_Table from "@/components/common/Custom_Table";
import { formatDate } from "@/utils/formatData";
import axios from "axios";
import React from "react";

type Props = {};

export default function AlertDetailsPage({}: Props) {
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
    <>
      <Custom_Tab />
      <Custom_Table
        tableType="alerts"
        select={true}
        columnFilter={true}
        data={data}
        handleSwitch={handleSwitch}
      />
    </>
  );
}
