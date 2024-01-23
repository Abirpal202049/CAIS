"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import styles from "./custom_table.module.scss";
import axios from "axios";

type props = {
  tableType: string;
};

const Custom_Table: React.FC<props> = ({ tableType }) => {
  const [data, setData] = React.useState([{}]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");
      setData(res.data.alerts);
    })();
  }, []);

  const AlertColumnBody = ({ data, field }: { data: any; field: any }) => {
    switch (field) {
      case "bu_id":
        return <div>{data.bu_id}</div>;
      case "score":
        return <div>{data.score}</div>;
      case "state":
        return <div>{data.state}</div>;
      case "deleted":
        return <div>{data.deleted}</div>;
      case "details":
        return <div>{data.details}</div>;
      case "fl_read":
        return <div>{data.fl_read}</div>;
      case "alert_id":
        return <div>{data.alert_id}</div>;
      case "status_id":
        return <div>{data.status_id}</div>;
      case "create_date":
        return <div>{data.create_date}</div>;
      case "alert_type_id":
        return <div>{data.alert_type_id}</div>;
      case "business_date":
        return <div>{data.business_date}</div>;
      case "business_unit":
        return <div>{data.business_unit}</div>;
      case "fl_attachment":
        return <div>{data.fl_attachment}</div>;
      case "last_update_date":
        return <div>{data.last_update_date}</div>;
      case "owner_internal_id":
        return <div>{data.owner_internal_id}</div>;
      case "business_unit_family":
        return <div>{data.business_unit_family}</div>;
      case "business_unit_family_previous":
        return <div>{data.business_unit_family_previous}</div>;
      default:
        return <div>{data.value}</div>;
    }
  };

  const columnBody = (data: any, options: any) => {
    switch (tableType) {
      case "alerts":
        return <AlertColumnBody data={data} field={options.field} />;
    }

    return <div className={styles.columnBody}>{data.value}</div>;
  };

  const onPageChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className={styles.customTableContainer}>
      <DataTable
        scrollable
        showSelectAll
        scrollHeight="calc(90vh - 100px)"
        rows={11}
        paginator
        rowsPerPageOptions={[11, 25, 50]}
        value={data.slice(0, 100)}
        tableStyle={{ minWidth: "250rem" }}
        emptyMessage="No Data found."
        totalRecords={100}
        onPage={onPageChange}
        className={styles[tableType]}
      >
        {data &&
          Object.keys(data[0]).map((ele, idx) => {
            return (
              <Column
                field={ele}
                header={ele}
                selectionMode={ele == "bu_id" ? "multiple" : undefined}
                headerStyle={{
                  color: "#acacac",
                  padding: "1rem 0rem",
                  fontWeight: "300",
                  backgroundColor: "#ffffff",
                }}
                key={idx}
                style={{
                  minWidth: "8rem",
                }}
                body={columnBody}
                className={styles.column}
                sortable
              />
            );
          })}
      </DataTable>
    </div>
  );
};

export default Custom_Table;
