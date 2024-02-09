import Custom_Tab from "@/components/common/Custom_Tab";
import { ArrowUpNarrowWide, ChevronDown, Plus, XCircle } from "lucide-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import NewWindow from "react-new-window";

const NoteInformation = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const tabsModel = [
    {
      label: "Alert Notes",
      value: "Alert Note",
      count: 13,
    },
    { label: "Account Notes", value: "Account Notes", count: 1 },
  ];

  const informationData = [
    {
      name: "Bruce Wayne",
      dateDay: "added a note 17 days ago (Mon, 19 Jul at 11:50 PM)",
      desc: "This is no longer concern",
    },
    {
      name: "Jenny Wilson",
      dateDay: "added a note 17 days ago (Mon, 19 Jul at 10:50 PM)",
      desc: "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
    },
    {
      name: "Kathryn Murphy",
      dateDay: "added a note 17 days ago (Mon, 19 Jul at 09:50 PM)",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
      name: "Jhon",
      dateDay: "added a note 17 days ago (Mon, 19 Jul at 09:50 PM)",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
  ];

  const buttonStyle = {
    borderColor: "var(--surface-400)",
    color: "var(--surface-900)",
  };

  const AddNotes = () => {
    return (
      <>
        <Dialog
          header="Header"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <NewWindow
        features={{ width: 600, height: 700, left: 0, top: 0 }}
        title="Notes Information"
        center="screen"
        copyStyles={true}
      >
        <div
          className="flex flex-col justify-center p-5 gap-5"
          // Stop event propagation to prevent the new window from closing
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col gap-3">
            <span className="font-bold text-2xl">Notes Information</span>
            <span className="text-surface-500 font-primary ">
              Last note added on (Tue, 22 May at 4:04 PM)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex font-primary gap-5">
              <Custom_Tab
                TabsModel={tabsModel}
                selectedTabIndex={tabIndex}
                setSelectedTabIndex={setTabIndex}
              />
            </span>

            <span className="flex justify-center items-center gap-3">
              <span className="flex justify-center items-center border border-surface-300 rounded-lg px-2 py-1 font-primary gap-2">
                <span>Sort</span>
                <span>
                  <ChevronDown width={20} />
                </span>
              </span>
              <span className="border border-surface-300 rounded-lg gap-2">
                <ArrowUpNarrowWide height={25} className="p-1" color="blue" />
              </span>
            </span>
          </div>

          <div className="flex flex-col border-2 border-surface-200 rounded-lg w-full h-auto p-5 gap-5">
            <span
              onClick={() => {
                setVisible(true);
              }}
              className="flex justify-center items-center border border-surface-300 rounded-lg gap-3 w-36 py-1 px-2"
            >
              <span>
                <Plus width={20} color="var(--surface-400)" />
              </span>
              <span className="font-primary">ADD NOTE</span>
            </span>

            {informationData?.map((items) => (
              <>
                <span className="flex items-center border-t-2 gap-5 py-3 border-surface-200">
                  <span className="bg-surface-200 p-6 border border-surface-300 rounded-lg">
                    <Plus />
                  </span>
                  <span className="flex flex-col justify-center gap-2 ">
                    <span className="font-bold">{items?.name}</span>
                    <span className="text-surface-500 ">{items?.dateDay}</span>
                    <span>{items?.desc}</span>
                  </span>
                </span>
              </>
            ))}
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

      <Dialog
        header="Add Note"
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        style={{ width: "50vw", zIndex: 10000 }}
      >
        <p>This is the dialog content for adding a note.</p>
      </Dialog>
    </>
  );
};

export default NoteInformation;
