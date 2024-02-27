import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Image, UploadCloud, X } from "lucide-react";
import { Button } from "primereact/button";

interface UploadProps {
  setShowUpload: (value: boolean) => void;
}

const Upload: React.FC<UploadProps> = ({ setShowUpload }) => {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  // TemplateSelect function
  const onTemplateSelect = (e: any) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  // TemplateUpload function
  const onTemplateUpload = (e: any) => {
    let _totalSize = 0;

    e.files.forEach((file: any) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  // TemplateRemove function
  const onTemplateRemove = (file: any, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  // TemplateClear function
  const onTemplateClear = () => {
    setTotalSize(0);
  };

  // headerTemplate function
  const headerTemplate = (options: any) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <span>
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </span>
        <span className="flex items-center gap-6 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
          <span className="cursor-pointer">
            <X
              onClick={() => {
                setShowUpload(false);
              }}
            />
          </span>
        </span>
      </div>
    );
  };

  // itemTemplate functions
  const itemTemplate = (file: any, props: any) => {
    return (
      <div className="flex items-center flex-wrap justify-between">
        <div className="flex items-center gap-3" style={{ width: "50%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex items-center flex-column text-left ml-3 gap-5">
            {file.name}
            <span className="text-surface-500 font-primary font-bold">
              <small>{new Date().toLocaleDateString()}</small>
            </span>
          </span>
        </div>
        <span>
          <Tag
            value={props.formatSize}
            severity="warning"
            className="px-3 py-2"
          />
        </span>
        <span>
          <Button
            type="button"
            className="p-button-outlined p-button-rounded p-button-danger "
            onClick={() => onTemplateRemove(file, props.onRemove)}
          >
            <X />
          </Button>
        </span>
      </div>
    );
  };

  // emptyTemplate function
  const emptyTemplate = () => {
    return (
      <div className="flex items-center justify-center gap-3 ">
        <Image />
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: <Image />,
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined ",
  };
  const uploadOptions = {
    icon: <UploadCloud />,
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: <X />,
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple
        accept="image/*"
        maxFileSize={1000000}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
};

export default Upload;
