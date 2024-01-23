"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

import styles from "./custom_table.module.scss";
import axios from "axios";

type props = {
  tableType: string
  select:boolean
  columnFilter:boolean
};

const Custom_Table: React.FC<props> = ({ tableType,select,columnFilter }) => {
  const [data, setData] = React.useState([{}]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [columns, setColumns] = React.useState<string []>([]);
  const [visibleColumns, setVisibleColumns] = React.useState(columns);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");
      setData(res.data.alerts);
      setColumns(Object.keys(res.data.alerts[0]));
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
    // API call for Pagination
  }

  const onColumnToggle = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol:string) => sCol === col));

    setVisibleColumns(orderedSelectedColumns);
};

const tableHeader = <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />;

  const columnHeader = (ele:string) =>{
    const name = ele.split("_").map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1)).join(" ");
    return <div className={styles.header}>{name}</div>
  }

  return (
    <div className={styles.customTableContainer}>
        <DataTable
          value={data.slice(0, 100)}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          totalRecords={100}
          onPage = {onPageChange}
          selectionMode={select==true?'multiple':null}
          selection={selectedItems}
          onSelectionChange={(e:any) => setSelectedItems(e.value)}
          scrollable
          showSelectAll
          stripedRows
          scrollHeight="calc(90vh - 100px)"
          className={styles[tableType]}
          tableStyle={{ minWidth: "250rem" }}
          emptyMessage="No Data found."
          header = {tableHeader}
        >

          {select && <Column selectionMode="multiple" style={{width:"3rem"}}/>}
          {data &&
            Object.keys(data[0]).map((ele, idx) => {
              return (
                <Column
                  field={ele}
                  header={()=>columnHeader(ele)}
                  headerStyle={{
                    color: "grey",
                    padding: "1rem 0rem",
                    fontWeight: "400",
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
