"use client";
import React from "react";
import { useGetAlertTypeofId, getAlertTypeofId } from "../../_api/alert_config";
import { useQuery } from "@tanstack/react-query";
import Custom_Tab from "@/components/common/Custom_Tab";
import {
  useGetDisplay,
  usePostDisplayAlertConfig,
} from "../../_api/display.config";
import {
  useGetActions,
  usePostActionAlertConfig,
} from "../../_api/action.config";
import {
  useGetWorkflow,
  usePostWorkflowAlertConfig,
} from "../../_api/workflow-config";
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
  unsaved: number;
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

  const { mutate: mutateAction } = usePostActionAlertConfig(params._id);
  const { mutate: mutateDisplay } = usePostDisplayAlertConfig(params._id);
  const { mutate: mutateWorkflow } = usePostWorkflowAlertConfig(params._id);

  const [tabsModel, setTabsModel] = React.useState<configTab[]>([
    {
      label: "Action",
      value: "Action",
      unsaved: 0,
    },
    {
      label: "Display",
      value: "Display",
      unsaved: 0,
    },
    {
      label: "Workflow",
      value: "Workflow",
      unsaved: 0,
    },
  ]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const submitAction = (newAdded: string[], deleted: string[]) => {
    mutateAction({ newAction: newAdded, deletedAction: deleted });
  };

  const submitDisplay = (newAdded: string[], deleted: string[]) => {
    mutateDisplay({ newDisplay: newAdded, deletedDisplay: deleted });
  };

  const submitWorkflow = (newAdded: string[], deleted: string[]) => {
    mutateWorkflow({ newWorkflow: newAdded, deletedWorkflow: deleted });
  };
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
          name="action"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
          submitConfig={submitAction}
        />
      )}
      {selectedTabIndex === 1 && (
        <ConfigureTab
          preValue={data.display_id_array?.map((ele: string, idx: number) => ({
            name: data.display_name_array[idx],
            id: ele,
          }))}
          allInfo={display?.data}
          name="display"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
          submitConfig={submitDisplay}
        />
      )}
      {selectedTabIndex === 2 && (
        <ConfigureTab
          preValue={data.workflow_id_array?.map((ele: string, idx: number) => ({
            name: data.workflow_name_array[idx],
            id: ele,
          }))}
          allInfo={workflow?.data}
          name="workflow"
          setTabsModel={setTabsModel}
          tabIndex={selectedTabIndex}
          submitConfig={submitWorkflow}
        />
      )}
    </div>
  );
}

const ConfigureTab = ({
  preValue,
  allInfo,
  name,
  setTabsModel,
  tabIndex,
  submitConfig,
}: {
  preValue: { name: string; id: string }[] | null;
  allInfo: [];
  name: string;
  setTabsModel: React.Dispatch<React.SetStateAction<configTab[]>>;
  tabIndex: number;
  submitConfig?: (newAction: string[], deletedAction: string[]) => void;
}) => {
  const [deletedActions, setDeletedActions] = React.useState<string[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<[]>([]);

  const updateTab = (unsaved: number) => {
    setTabsModel((prev) => {
      return prev.map((ele, idx) => {
        if (tabIndex === idx && ele.unsaved != 2) {
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
                    updateTab(2);
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
            updateTab(1);
          } else {
            updateTab(0);
          }
        }}
        options={allInfo}
        optionLabel="name"
        display="chip"
        filter
        placeholder={`Select ${name.charAt(0).toUpperCase() + name.slice(1)}`}
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
      <Button
        label="Submit"
        className="px-5 py-2 mt-12 float-right"
        onClick={() => {
          console.log(selectedItems);

          submitConfig?.(
            selectedItems.map((ele: any) => ele[`${name}_id`]),
            deletedActions
          );
        }}
      />
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
