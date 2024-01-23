"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import styles from "./custom_table.module.scss";
import axios from "axios";

type props = {};



const Custom_Table: React.FC<props> = ({}) => {

  const [data, setData] = React.useState([{}]);

  React.useEffect(() => {
    (async () =>{
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");
      setData(res.data.alerts);
    })()
  },[]);
  
  const columnBody = (data:any) =>{
    const tableType = "alerts"
    switch(tableType){
      case "alerts":
        return <></>
    }

    return <div className={styles.columnBody}>{data.value}</div>
  }
  return (
    <div className={styles.customTableContainer}>
      <div>
        <DataTable
          showGridlines
          scrollable
          showSelectAll
          stripedRows
          value={data.slice(0, 100)}
          tableStyle={{ minWidth: "200rem" }}
          emptyMessage="No Data found."
        >
          {data &&
            Object.keys(data[0]).map((ele, idx) => {
              return (
                <Column
                  field={ele}
                  header={ele}
                  headerStyle={{
                    color: "grey",
                    padding: "1rem 0rem",
                    fontWeight: "400",
                    position: "sticky",
                    top: "0",
                    zIndex: "2",
                    backgroundColor: "#f8f9fa",
                  }}
                  key={idx}
                  style={{
                    minWidth: "8rem",
                    fontWeight: "500",
                    padding: "1rem 0rem",
                  }}
                  // body={body}
                  className={styles.column}
                />
              );
            })}
        </DataTable>
      </div>
    </div>
  );
};

export default Custom_Table;
