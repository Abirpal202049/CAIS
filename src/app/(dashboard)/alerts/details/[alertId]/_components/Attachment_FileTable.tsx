import React from "react";
import { AlignJustify, ArrowUp, LayoutGrid, Search } from "lucide-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  FileDoc,
  FilePdf,
  FilePng,
  FileJpg,
  UnknownFile,
} from "@/data/svgr/Attachments_Files";

const Attachment_Files = () => {
  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
  };
  const columnBody = [
    {
      id: "1",
      name: "dummy text of the printing and types...",
      fileType: "DOC",
      fileSize: "146 KB",
    },
    {
      id: "2",
      name: "dummy text of the printing and types...",
      fileType: "PNG",
      fileSize: "122 KB",
    },
    {
      id: "3",
      name: "dummy text of the printing and types...",
      fileType: "JPG",
      fileSize: "256 KB",
    },
    {
      id: "4",
      name: "dummy text of the printing and types...",
      fileType: "PDF",
      fileSize: "125 KB",
    },
    {
      id: "5",
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "2 KB",
    },
    {
      id: "6",
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "5 KB",
    },
    {
      id: "7",
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "10 KB",
    },
    {
      id: "8",
      name: "Unknown.dat",
      fileType: "-",
      fileSize: "12 KB",
    },
  ];

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

  const nameBodyTemplate = (columnBody: any) => {
    return (
      <div className="flex items-center">
        <span className="mr-2 ">{renderFileIcon(columnBody.fileType)}</span>
        <span>{columnBody?.name}</span>
      </div>
    );
  };

  const fileTypeHeader = () => {
    return (
      <div className="flex items-center">
        <span>FILE TYPE</span>
        <ArrowUp width={20} color="var(--surface-500)" />
      </div>
    );
  };

  const fileSizeHeader = () => {
    return (
      <div className="flex  items-center">
        <span>FILE SIZE</span>
        <ArrowUp width={20} color="var(--surface-500)" />
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="flex items-center justify-between">
        <span className="p-input-icon-left ">
          <Search width={20} className="top-4" />
          <InputText
            placeholder="Search by name or file type..."
            size={45}
            style={{
              backgroundColor: "var(--surface-100)",
              border: "none",
            }}
          />
        </span>

        <span className="flex items-center gap-4 border-l-2 pl-6 border-surface-300">
          <span>view:</span>
          <span className="bg-surface-400 p-1 rounded-lg">
            <AlignJustify width={22} strokeWidth={3} />
          </span>
          <span className="bg-surface-300 p-1 rounded-lg">
            <LayoutGrid width={20} fill="var(--surface-500)" strokeWidth={0} />
          </span>
        </span>
      </div>

      <div className="flex border border-surface-300 rounded-lg">
        <DataTable value={columnBody}>
          <Column field="name" header="NAME" body={nameBodyTemplate} />
          <Column field="fileType" header={fileTypeHeader}></Column>
          <Column field="fileSize" header={fileSizeHeader}></Column>
        </DataTable>
      </div>

      <div className="flex items-center gap-5">
        <Button label="Back" outlined className="w-32" style={buttonStyle} />
        <Button label="Finish" className="w-32" />
      </div>
    </div>
  );
};

export default Attachment_Files;
