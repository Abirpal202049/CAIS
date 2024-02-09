import Custom_Table from "@/components/common/Custom_Table";
import { AlignJustify, LayoutGrid, Plus, Search, Upload } from "lucide-react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React from "react";
import NewWindow from "react-new-window";

const Attachments = () => {
  const tabsModel = [
    {
      label: "Alert Notes",
      value: "Alert Note",
      count: 13,
    },
    { label: "Account Notes", value: "Account Notes", count: 1 },
  ];

  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
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
                style={{ backgroundColor: "var(--surface-200)" }}
              />
            </span>

            <span className="flex items-center gap-4 border-l-2 pl-6 border-surface-300">
              <span>view:</span>
              <span className="bg-surface-400 p-1 surface-300 rounded-lg">
                <AlignJustify width={22} strokeWidth={3} />
              </span>
              <span className="bg-surface-300 p-1 surface-300 rounded-lg">
                <LayoutGrid
                  width={20}
                  fill="var(--surface-500)"
                  strokeWidth={0}
                />
              </span>
            </span>
          </div>

          <div>
            <DataTable value={tabsModel}>
              <Column field="Name" header="Name"></Column>
              <Column field="File" header="File Type"></Column>
              <Column field="file" header="File size"></Column>
            </DataTable>
            {/* <Custom_Table
              tableType="alerts"
              columnFilter={false}
              data={tabsModel}
              handleSwitch={() => {
                console.log("hello");
              }}
            /> */}
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
