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
  const [columns, setColumns] = React.useState<{field:string,header:string} []>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<{field:string,header:string} []>([]);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("https://api.npoint.io/b4e5dbdf2e9ad517f981");
      setData(res.data.alerts);
      const dynamicColumns = Object.keys(res.data.alerts[0]).map((ele) => ({field:ele,header:ele.split("_").map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1)).join(" ")}));
      setColumns(dynamicColumns);
      setVisibleColumns(dynamicColumns);
    })();
  }, []);

  // Shift this function to utilities
  const formatDate = (date: string) => {
    const  newDate = new Date(date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(newDate);  // editing and verification needed
  
  // Replace space before single-digit day with an empty string
  return formattedDate.replace(/ (\d) /, ' $1 ');
    return newDate.toLocaleDateString();
  }
  const AlertColumnBody = ({ data, field }: { data: any; field: any }) => {
    const Container = (value:string) =>{
      return <div className={styles.alertColumn}>{value}</div>
    }
    switch (field) {
      case "bu_id":
        return Container(data.bu_id);
      case "score":
        return Container(data.score);
      case "state":
        return Container(data.state);
      case "deleted":
        return Container(data.deleted);
      case "details":
        return Container(data.details);
      case "fl_read":
        return Container(data.fl_read);
      case "alert_id":
        return Container(data.alert_id);
      case "status_id":
        return Container(data.status_id);
      case "create_date":
        return Container(formatDate(data.create_date));
      case "alert_type_id":
        return Container(data.alert_type_id);
      case "business_date":
        return Container(formatDate(data.business_date));
      case "business_unit":
        return Container(data.business_unit);
      case "fl_attachment":
        return Container(data.fl_attachment);
      case "last_update_date":
        return Container(data.last_update_date);
      case "owner_internal_id":
        return Container(data.owner_internal_id);
      case "business_unit_family":
        return Container(data.business_unit_family);
      case "business_unit_family_previous":
        return  Container(data.business_unit_family_previous);
      default:
        return Container("-");
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
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol:{field:string,header:string}) => sCol.field === col.field));

    setVisibleColumns(orderedSelectedColumns);
};

const tableHeader = <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} display="chip" multiple className={styles.dynamicColumn}/>;

  const columnHeader = (ele:string) =>{
    const name = ele.split("_").map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1)).join(" ");
    return <div className={styles.header}>{name}</div>
  }

  return (
    <div className={styles.customTableContainer}>
        <DataTable
          value={data.slice(0, 100)}
          header = {tableHeader}
          // pagination from here
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          totalRecords={100}
          // onPage = {onPageChange}
          // selecting row with checkboxes from here
          selectionMode={select==true?'multiple':null}
          selection={selectedItems}
          onSelectionChange={(e:any) => setSelectedItems(e.value)}
          // sortIcon
          scrollable
          showSelectAll
          scrollHeight="calc(90vh - 100px)"
          className={styles[tableType]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="No Data found."
        >

          {select && <Column selectionMode="multiple" style={{width:"3rem"}}/>}
          {data &&
            visibleColumns.map((ele, idx) => {
              return (
                <Column
                  field={ele.field}
                  header={ele.header}
                  headerStyle={{
                    color: "grey",
                    padding: "1rem",
                    fontWeight: "400",
                    top: "0",
                    zIndex: "2",
                    backgroundColor: "#f8f9fa",
                  }}
                  key={idx}
                  style={{
                    // minWidth: "6rem",
                    fontWeight: "500",
                    padding: "1rem",
                  }}
                  body={columnBody}
                  sortable
                />
              );
            })}
        </DataTable>
    </div>
  );
};

export default Custom_Table;
