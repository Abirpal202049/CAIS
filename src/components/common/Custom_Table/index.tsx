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
import {
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  ChevronsUp,
  ChevronsUpDown,
} from "lucide-react";

type Props = {
  tableType: string;
  data: any;
  handleSwitch: any;
  select?: boolean;
  columnFilter?: boolean;
  ScrollHeight?: string;
  ResizableColumns?: boolean;
};

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

type ColumnProps = {
  field: string;
  header: string;
};

const Custom_Table: React.FC<Props> = ({
  tableType,
  select = false,
  columnFilter = false,
  ScrollHeight,
  ResizableColumns,
  data,
  handleSwitch,
}) => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  // States for Filteration
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const [columns, setColumns] = React.useState<ColumnProps[]>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<ColumnProps[]>([]);

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
          onClick={clearFilter}
          size="small"
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
  const customSortIcon = (options: any) => {
    const order = options.sortOrder;
    if (order === 0) return <ChevronsUpDown size={15} />;
    else if (order === 1)
      return (
        <ChevronsDown size={15} style={{ color: "var(--primary-color)" }} />
      );
    else
      return <ChevronsUp size={15} style={{ color: "var(--primary-color)" }} />;
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
        // totalRecords={100}
        // onPage = {onPageChange}
        // selecting row with checkboxes from here
        sortIcon={customSortIcon}
        selectionMode={select == true ? "multiple" : null}
        selection={selectedItems}
        onSelectionChange={(e: any) => setSelectedItems(e.value)}
        scrollable
        showSelectAll
        scrollHeight={ScrollHeight || "calc(74vh - 100px)"}
        className={styles[tableType]}
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No Data found."
        globalFilter={globalFilterValue}
        globalFilterFields={visibleColumns.map((col) => col.field)}
        resizableColumns={ResizableColumns || false}
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
                headerClassName={styles.columnHeaderName}
                // headerStyle={{
                //   color: "grey",
                //   padding: "1rem",
                //   fontWeight: "400",
                //   top: "0",
                //   backgroundColor: "#f8f9fa",
                // }}
                bodyClassName={styles.columnClassName}
                key={idx}
                style={{
                  maxWidth: "18rem",
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
