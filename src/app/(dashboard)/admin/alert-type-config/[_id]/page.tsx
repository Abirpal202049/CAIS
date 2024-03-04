"use client";
import React from "react";
import { useGetAlertTypeofId, getAlertTypeofId } from "../../_api/alert_config";
import { useQuery } from "@tanstack/react-query";
import Custom_Tab from "@/components/common/Custom_Tab";
import { useGetDisplay } from "../../_api/display.config";
import { useGetActions } from "../../_api/action.config";
import { useGetWorkflow } from "../../_api/workflow-config";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { X, XCircle } from "lucide-react";
import { Button } from "primereact/button";

type ConfigProps = {
  params: {
    _id: string;
  };
};

type configTab = {
  label: string;
  value: string;
  unsaved: boolean;
};
export default function Config({ params }: ConfigProps) {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAlertTypeofId(params._id);
  const { data: actions } = useGetActions();
  const { data: display } = useGetDisplay();
  const { data: workflow } = useGetWorkflow();

  const [tabsModel, setTabsModel] = React.useState<configTab[]>([
    {
      label: "Action",
      value: "Action",
      unsaved: false,
    },
    {
      label: "Display",
      value: "Display",
      unsaved: false,
    },
    {
      label: "Workflow",
      value: "Workflow",
      unsaved: false,
    },
  ]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  if (isLoading) return <div>Loading...</div>;
  const { data } = response;

  return (
    <div className="p-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2">
          <h2 className="!text-2xl">Alert Type Configuration</h2>
          <span className="flex items-center bg-pink text-surface-0 py-0.5 px-2 rounded-lg">
            KYC
          </span>
        </div>
        <div
          className={`border rounded-lg !text-xl p-1 ${
            data.configured ? "border-green text-green" : "border-red text-red"
          }`}
        >
          {data.configured ? "Configured" : "Not Configured"}
        </div>
      </div>
      <div className="flex mt-5">
        <div className="pr-10 border-r-2">
          <NameVal name="Name" value="data.name" />
          <NameVal name="Identifier" value="data.identifier" />
          <NameVal name="Configured" value={data.configured ? "Yes" : "No"} />
        </div>
        <div className="pl-10">
          <BadgeArray name="Display" data={data.display_name_array} />
          <BadgeArray name="Action" data={data.action_name_array} />
          <BadgeArray name="WorkFlow" data={data.workflow_name_array} />
        </div>
      </div>
      <Custom_Tab
        TabsModel={tabsModel}
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
      {selectedTabIndex === 0 && (
        <ConfigureTab
          preValue={data.action_id_array?.map((ele: string, idx: number) => ({
            name: data.action_name_array[idx],
            id: ele,
          }))}
          allInfo={actions?.data}
          name="Action"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
        />
      )}
      {selectedTabIndex === 1 && (
        <ConfigureTab
          preValue={data.display_id_array?.map((ele: string, idx: number) => ({
            name: data.display_name_array[idx],
            id: ele,
          }))}
          allInfo={display?.data}
          name="Display"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
        />
      )}
      {selectedTabIndex === 2 && (
        <ConfigureTab
          preValue={data.workflow_id_array?.map((ele: string, idx: number) => ({
            name: data.workflow_name_array[idx],
            id: ele,
          }))}
          allInfo={workflow?.data}
          name="Workflow"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
        />
      )}
    </div>
  );
}

const ConfigureTab = ({
  preValue = [
    { name: "test", id: "test" },
    { name: "test1", id: "test1" },
  ],
  allInfo,
  name,
  setTabsModel,
  tabIndex,
}: {
  preValue: { name: string; id: string }[] | null;
  allInfo: [];
  name: string;
  setTabsModel: React.Dispatch<React.SetStateAction<configTab[]>>;
  tabIndex: number;
}) => {
  const [deletedActions, setDeletedActions] = React.useState<string[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<[]>([]);

  const updateTab = (unsaved: boolean) => {
    setTabsModel((prev) => {
      return prev.map((ele, idx) => {
        if (tabIndex === idx) {
          ele.unsaved = unsaved;
        }
        return ele;
      });
    });
  };
  return (
    <div className="my-2 max-w-[50rem]">
      <div className="flex items-center border rounded-lg h-12 my-2 px-2 gap-2">
        {preValue
          ?.filter((ele, id) => {
            if (deletedActions.includes(ele.id)) {
              return false;
            }
            return true;
          })
          .map((ele, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center w-fit rounded-full bg-surface-300 b p-1 px-2 gap-2"
              >
                <div>{ele.name}</div>
                <div
                  onClick={() => {
                    setDeletedActions([...deletedActions, ele.id]);
                    updateTab(true);
                  }}
                  className="cursor-pointer"
                >
                  <XCircle size={15} className="relative scale-[1.2]" />
                </div>
              </div>
            );
          })}
      </div>
      <MultiSelect
        value={selectedItems}
        onChange={(e) => {
          setSelectedItems(e.value);
          if (e.value.length > 0) {
            updateTab(true);
          } else {
            updateTab(false);
          }
        }}
        options={allInfo}
        optionLabel="name"
        display="chip"
        filter
        placeholder={`Select ${name}`}
        pt={{
          token: {
            className: "!bg-surface-300",
          },
          input: {
            className: "border-surface-900",
          },
        }}
        className="w-full md:w-20rem "
      />
      <Button label="Submit" className="px-5 py-2 mt-12 float-right" />
    </div>
  );
};

const NameVal = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex items-center gap-20">
      <div className="!text-xl w-32">{name}</div>
      <div className="text-black !text-lg">{value}</div>
    </div>
  );
};

const BadgeArray = ({
  name,
  data,
}: {
  name: string;
  data: string[] | null;
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="!text-xl w-32">{name}</div>
      {data?.slice(0, Math.min(5, data.length)).map((item: any, index: any) => (
        <div key={index} className="bg-pink text-surface-0 p-1 rounded-lg">
          {item}
        </div>
      ))}
      {!data && <>-</>}
    </div>
  );
};
