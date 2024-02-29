import React, { useState } from "react";
import { AlignJustify, LayoutGrid, Search } from "lucide-react";
import { Button } from "primereact/button";
import {
  FileDoc,
  FilePdf,
  FilePng,
  FileJpg,
  UnknownFile,
} from "@/data/svgr/Attachments_Files";
import Custom_Table from "@/components/common/Custom_Table";
import { InputText } from "primereact/inputtext";

type Props = {
  showButtons?: boolean;
};

const Attachment_FileTable: React.FC<Props> = ({ showButtons = "true" }) => {
  const [tableView, setTableView] = useState<"list" | "grid">("list");

  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
  };
  const columnBody = [
    {
      name: "dummy text of the printing and types...",
      fileType: "DOC",
      fileSize: "146 KB",
    },
    {
      name: "dummy text of the printing and types...",
      fileType: "PNG",
      fileSize: "122 KB",
    },
    {
      name: "dummy text of the printing and types...",
      fileType: "JPG",
      fileSize: "256 KB",
    },
    {
      name: "dummy text of the printing and types...",
      fileType: "PDF",
      fileSize: "125 KB",
    },
    {
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "2 KB",
    },
    {
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "5 KB",
    },
    {
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "10 KB",
    },
    {
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "12 KB",
    },
  ];

  const columnData = columnBody.map((item, index) => ({
    name: item.name,
    fileType: item.fileType,
    fileSize: item.fileSize,
  }));

  const renderFileIcon = (fileType: any, size = 25) => {
    switch (fileType) {
      case "DOC":
        return <FileDoc width={size} height={size} />;
      case "JPG":
        return <FilePdf width={size} height={size} />;
      case "PDF":
        return <FilePng width={size} height={size} />;
      case "PNG":
        return <FileJpg width={size} height={size} />;
      default:
        return <UnknownFile width={size} height={size} />;
    }
  };

  const handleSwitch = (rowData: any, field: any) => {
    switch (field) {
      case "name":
        return (
          <span className="flex items-center">
            <span className="mr-2">{renderFileIcon(rowData.fileType)}</span>
            <span className="text-nowrap grow-1">{rowData[field]}</span>
          </span>
        );
      case "fileType":
        return <span>{rowData[field]}</span>;
      case "fileSize":
        return <span>{rowData[field]}</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col gap-6 mt-2 relative h-[45rem] ${
        tableView === "grid" ? "h-[35rem]" : ""
      }`}
    >
      <span className="flex items-center gap-4 border-l-2 pl-6 border-surface-300 absolute right-0 mt-5 z-10">
        <span>view:</span>
        <span
          className={` p-1 rounded-lg cursor-pointer ${
            tableView === "list" ? "bg-surface-400" : "bg-surface-200"
          }`}
          onClick={() => {
            setTableView("list");
          }}
        >
          <AlignJustify width={22} color="var(--surface-600)" strokeWidth={3} />
        </span>
        <span
          className={`p-1 rounded-lg cursor-pointer ${
            tableView === "grid" ? "bg-surface-400" : "bg-surface-200"
          }`}
          onClick={() => {
            setTableView("grid");
          }}
        >
          <LayoutGrid width={20} fill="var(--surface-600)" strokeWidth={0} />
        </span>
      </span>

      {tableView === "grid" ? (
        <div className="flex flex-col gap-6   ">
          <div className="p-input-icon-left mt-4">
            <Search width={20} className="top-4 " />
            <InputText
              placeholder="Search by name or file type..."
              size={28}
              className="bg-surface-100 !shadow-none"
            />
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-4 ">
            {columnData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-surface-300 rounded-lg p-4"
              >
                {renderFileIcon(item.fileType)}
                <div className="w-20 truncate">{item.name}</div>
                <span>{item.fileType}</span>
                <span>{item.fileSize}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Custom_Table
            tableHeading=""
            columnFilter
            data={columnData}
            handleSwitch={handleSwitch}
            select={false}
            ScrollHeight="calc(74vh - 100px)"
            showColumnButton={false}
          />
        </div>
      )}

      {showButtons && (
        <div
          className={`flex items-center gap-5 mt-1 ${
            tableView === "grid" ? "mt-5" : ""
          }`}
        >
          <Button label="Back" outlined className="w-32" style={buttonStyle} />
          <Button label="Finish" className="w-32" />
        </div>
      )}
    </div>
  );
};

export default Attachment_FileTable;
