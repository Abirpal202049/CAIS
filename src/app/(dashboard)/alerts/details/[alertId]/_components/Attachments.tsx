import {
  AlignJustify,
  ArrowUp,
  File,
  LayoutGrid,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React from "react";
import NewWindow from "react-new-window";

const Attachments = () => {
  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
  };

  const columnBody = [
    {
      id: "1",
      name: "dummy text of the printing and types...",
      fileRype: "DOC",
      fileSize: "146 KB",
    },
    {
      id: "2",
      name: "dummy text of the printing and types...",
      fileRype: "PNG",
      fileSize: "122 KB",
    },
    {
      id: "3",
      name: "dummy text of the printing and types...",
      fileRype: "JPG",
      fileSize: "256 KB",
    },
    {
      id: "4",
      name: "dummy text of the printing and types...",
      fileRype: "PDF",
      fileSize: "125 KB",
    },
    {
      id: "5",
      name: "Unknown.dat",
      fileRype: "-",
      fileSize: "2 KB",
    },
    {
      id: "6",
      name: "Unknown.dat",
      fileRype: "-",
      fileSize: "5 KB",
    },
    {
      id: "7",
      name: "Unknown.dat",
      fileRype: "-",
      fileSize: "10 KB",
    },
    {
      id: "8",
      name: "Unknown.dat",
      fileRype: "-",
      fileSize: "12 KB",
    },
  ];

  const nameBodyTemplate = (columnBody: any) => {
    return (
      <div className="flex items-center">
        <span className="mr-2">
          <File width={20} color="var(--surface-400)" />
        </span>
        <span>{columnBody?.name}</span>
      </div>
    );
  };

  const fileTypeHeader = () => {
    return (
      <div className="flex justify-center items-center gap-2">
        <span>FILE TYPE</span>
        <ArrowUp width={20} color="var(--surface-500)" />
      </div>
    );
  };

  const fileSizeHeader = () => {
    return (
      <div className="flex justify-center items-center gap-2">
        <span>FILE SIZE</span>
        <ArrowUp width={20} color="var(--surface-500)" />
      </div>
    );
  };

  return (
    <>
      <NewWindow
        title="Attachments "
        features={{ width: 600, height: 700, left: 0, top: 0 }}
        center="screen"
        copyStyles={true}
      >
        <div className="flex flex-col justify-center p-5 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-4xl ">List of Attachments</span>
            <span className="text-surface-500 font-primary ">
              Alert # 121091
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Button
              label="Create folder"
              outlined
              className="w-46 h-10 gap-2"
              style={buttonStyle}
            >
              <Plus width={20} color="var(--surface-400)" />
            </Button>
            <Button
              label="Upload"
              outlined
              className="w-32 gap-2 h-10"
              style={buttonStyle}
            >
              <Upload width={20} color="var(--surface-400)" />
            </Button>
          </div>

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
                <LayoutGrid
                  width={20}
                  fill="var(--surface-500)"
                  strokeWidth={0}
                />
              </span>
            </span>
          </div>

          <div className="flex border border-surface-300 rounded-lg">
            <DataTable value={columnBody}>
              <Column field="name" header="NAME" body={nameBodyTemplate} />
              <Column field="fileRype" header={fileTypeHeader}></Column>
              <Column field="fileSize" header={fileSizeHeader}></Column>
            </DataTable>
          </div>

          <div className="flex items-center gap-5">
            <Button
              label="Back"
              outlined
              className="w-32"
              style={buttonStyle}
            />
            <Button label="Finish" className="w-32" />
          </div>
        </div>
      </NewWindow>
    </>
  );
};

export default Attachments;
