import { Plus, Upload } from "lucide-react";
import { Button } from "primereact/button";
import React, { useState } from "react";
import NewWindow from "react-new-window";
import UploadFile from "@/app/(dashboard)/alerts/details/[alertId]/_components/Upload";
import Attachment_FileTable from "./Attachment_FileTable";

type props = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
};
const Attachments = ({ close }: props) => {
  const [showUpload, setShowUpload] = useState(false);

  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
  };

  return (
    <NewWindow
      title="Attachments "
      features={{ width: 600, height: 700, left: 0, top: 0 }}
      center="screen"
      copyStyles={true}
      onUnload={() => {
        close(false);
      }}
    >
      <div
        className="flex flex-col justify-center p-5 gap-6"
        // Stop event propagation to prevent the new window from closing
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-3">
          <span className="font-bold text-4xl ">List of Attachments</span>
          <span className="text-surface-500 font-primary ">Alert # 121091</span>
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
            onClick={() => {
              setShowUpload(true);
            }}
          >
            <Upload width={20} color="var(--surface-400)" />
          </Button>
        </div>
        {showUpload && (
          <span>
            <UploadFile setShowUpload={setShowUpload} />
          </span>
        )}

        <span>
          <Attachment_FileTable />
        </span>
      </div>
    </NewWindow>
  );
};

export default Attachments;
