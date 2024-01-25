"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import styles from "./custom_table.module.scss";

type props = {
  tableType: string;
  select: boolean;
  columnFilter: boolean;
  data: any;
  handleSwitch: any;
};

const Custom_Table: React.FC<props> = ({
  tableType,
  select,
  columnFilter,
  data,
  handleSwitch,
}) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [columns, setColumns] = React.useState<
    { field: string; header: string }[]
  >([]);
  const [visibleColumns, setVisibleColumns] = React.useState<
    { field: string; header: string }[]
  >([]);
  React.useEffect(() => {
    (async () => {
      console.log(data);

      const dynamicColumns = Object.keys(data[0]).map((ele) => ({
        field: ele,
        header: ele
          .split("_")
          .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
          .join(" "),
      }));
      setColumns(dynamicColumns);
      setVisibleColumns(dynamicColumns);
    })();
  }, [data]);

  const columnBody = (data: any, options: any) => {
    return handleSwitch(data, options.field);
  };

  const onPageChange = (event: any) => {
    console.log(event);
    // API call for Pagination
  };

  const onColumnToggle = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some(
        (sCol: { field: string; header: string }) => sCol.field === col.field
      )
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const tableHeader = (
    <MultiSelect
      value={visibleColumns}
      options={columns}
      optionLabel="header"
      onChange={onColumnToggle}
      display="chip"
      className={`${styles.dynamicColumn} ${
        columns.length === visibleColumns.length
          ? styles.dynamicColumnChipsHide
          : ""
      }`}
    />
  );

  const columnHeader = (ele: string) => {
    const name = ele
      .split("_")
      .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
      .join(" ");
    return <div className={styles.header}>{name}</div>;
  };
  return (
    <div className={styles.customTableContainer}>
      <DataTable
        value={data.slice(0, 100)}
        header={tableHeader}
        // pagination from here
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        totalRecords={100}
        // onPage = {onPageChange}
        // selecting row with checkboxes from here
        selectionMode={select == true ? "multiple" : null}
        selection={selectedItems}
        onSelectionChange={(e: any) => setSelectedItems(e.value)}
        scrollable
        showSelectAll
        scrollHeight="calc(90vh - 100px)"
        className={styles[tableType]}
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No Data found."
      >
        {select && (
          <Column selectionMode="multiple" style={{ width: "3rem" }} />
        )}
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
