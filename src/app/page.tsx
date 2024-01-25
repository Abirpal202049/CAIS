"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Custom_Table from "@/components/common/Custom_Table";
import Custom_Tab from "@/components/common/Custom_Tab";

//utils
import { formatDate } from "@/utils/formatData";

export default function Home() {
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/65c1706f2f4be7cbc4f8");
      console.log(res.data);

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
    <>
      <h1>Cais </h1>
      <Custom_Tab />
      <Custom_Table
        tableType="alerts"
        select={true}
        columnFilter={true}
        data={data}
        handleSwitch={handleSwitch}
      />
      <Link href="/login">Login</Link>
    </>
  );
}
