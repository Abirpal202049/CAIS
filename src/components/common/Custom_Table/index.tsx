"use client";
import axios from "axios";
import React from "react";
import { DataTable } from "primereact/datatable";

const Custom_Table: React.FC = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://api.npoint.io/b4e5dbdf2e9ad517f981"
      );
      setData(response.data);
    })();
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default Custom_Table;
