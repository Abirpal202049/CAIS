"use client";
import React, { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import styles from "./custom_table.module.scss";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Search } from "@/data/svgr/Filters";

type Props = {
  tableType: string;
  select: boolean;
  columnFilter: boolean;
  data: any;
  handleSwitch: any;
};

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const Custom_Table: React.FC<Props> = ({
  tableType,
  select,
  columnFilter,
  data,
  handleSwitch,
}) => {
  console.log(data);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [columns, setColumns] = React.useState<
    { field: string; header: string }[]
  >([]);
  const [visibleColumns, setVisibleColumns] = React.useState<
    { field: string; header: string }[]
  >([]);

  // States for Filteration
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  React.useEffect(() => {
    const dynamicColumns = Object.keys(data[0]).map((ele) => ({
      field: ele,
      header: ele
        .split("_")
        .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
        .join(" "),
    }));
    setColumns(dynamicColumns);
    setVisibleColumns(dynamicColumns);
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

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    setGlobalFilterValue("");
    setFilters(defaultFilters);
  };

  const globalSearch = () => {
    return (
      <div className={styles.table_header_filter}>
        <span className="p-input-icon-left">
          <Search />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
      </div>
    );
  };

  const tableHeader = () => (
    <div className={styles.table_headerStyle}>
      <div>{columnFilter && globalSearch()}</div>
      <MultiSelect
        value={visibleColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        // display="chip"
        className={`${styles.dynamicColumn} ${
          columns.length === visibleColumns.length
            ? styles.dynamicColumnChipsHide
            : ""
        }`}
      />
    </div>
  );

  // const columnHeader = (ele: string) => {
  //   const name = ele
  //     .split("_")
  //     .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
  //     .join(" ");
  //   return <div className={styles.header}>{name}</div>;
  // };

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
        globalFilter={globalFilterValue}
        globalFilterFields={visibleColumns.map((col) => col.field)}
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
                bodyClassName={styles.tableClassName}
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
