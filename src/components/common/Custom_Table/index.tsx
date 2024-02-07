"use client";
import React, { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { FilterMatchMode } from "primereact/api";
import { ProgressSpinner } from "primereact/progressspinner";
import { Search } from "@/data/svgr/Filters";

import styles from "./custom_table.module.scss";

import { saveAs } from "file-saver";

import {
  ChevronsDown,
  ChevronsUp,
  ChevronsUpDown,
  XCircle,
} from "lucide-react";

type Props = {
  tableType: string;
  data: any;
  handleSwitch: any;
  select?: boolean;
  columnFilter?: boolean;
  ScrollHeight?: string;
  ResizableColumns?: boolean;
  exportable?: boolean;
};

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

type ColumnProps = {
  field: string;
  header: string;
};

const exportCSV = (dt: any, selectionOnly: boolean) => {
  dt.current.exportCSV({ selectionOnly });
};

//Exporting table logic start here
const exportExcel = (data: any) => {
  import("xlsx").then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, "products");
  });
};

const saveAsExcelFile = (buffer: any, fileName: string) => {
  let EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  let EXCEL_EXTENSION = ".xlsx";
  const data = new Blob([buffer], {
    type: EXCEL_TYPE,
  });

  saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
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

  const [loading, setLoading] = React.useState(true);

  const dtRef = React.useRef(null);
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
        <span className="flex justify-between items-center border rounded-lg border-[--surface-400] p-2">
          <Search />
          <input
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="outline-0 placeholder:text-muted focus:outline-0 px-1"
          />
          <XCircle
            size={20}
            className={`text-muted cursor-pointer ${
              globalFilterValue.length === 0 ? "opacity-0" : ""
            }`}
            onClick={clearFilter}
          />
        </span>
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
  // Custom Sort Icon
  const customSortIcon = (options: any) => {
    const order = options.sortOrder;
    if (order === 0) return <ChevronsUpDown size={15} />; // not sorted
    else if (order === 1)
      return (
        <ChevronsDown size={15} style={{ color: "var(--primary-color)" }} /> // ascending
      );
    else
      return <ChevronsUp size={15} style={{ color: "var(--primary-color)" }} />; // descending
  };

  return (
    <div className={styles.customTableContainer}>
      {loading && <ProgressSpinner />}
      <div className={`${loading ? "hidden" : ""}`}>
        <DataTable
          ref={dtRef}
          value={data}
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
          className={styles.customTable}
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
    </div>
  );
};

export default Custom_Table;
