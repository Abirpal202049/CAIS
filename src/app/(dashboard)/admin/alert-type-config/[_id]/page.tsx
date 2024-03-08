"use client";
import React, { useMemo } from "react";
import { useGetAlertTypeofId, getAlertTypeofId } from "../../_api/alert_config";
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
import { CheckCircle2, Search, XCircle } from "lucide-react";
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
          <h2 className="!text-3xl">Configure {data.name} Alert Type</h2>
          <span className="flex items-center bg-green100 text-green py-0.5 px-2 rounded-full border border-green">
            {data.name}
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
      <div className="flex mt-5 w-full border px-3 py-6 border-surface-200 rounded-lg">
        <div className="pr-10 border-r-2 w-[30%] border-surface-300 space-y-3">
          <NameVal name="Name" value={data.name} />
          <NameVal name="Identifier" value={data.identifier} />
          <div className="flex items-center gap-20 text-surface-600">
            <div className="!text-xl w-32">Configured</div>
            <div className="text-black !text-lg">
              {data["configured"] ? (
                <CheckCircle2 className="text-green" />
              ) : (
                <XCircle className="text-red" />
              )}
            </div>
          </div>
        </div>
        <div className="pl-10 space-y-3">
          <BadgeArray
            name="Display"
            data={data.display_name_array}
            bgColor="bg-green100"
            textColor="bg-green"
          />
          <BadgeArray
            name="Action"
            data={data.action_name_array}
            bgColor="bg-yellow100"
            textColor="bg-yellow"
          />
          <BadgeArray
            name="WorkFlow"
            data={data.workflow_name_array}
            bgColor="bg-purple100"
            textColor="bg-purple"
          />
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
          idName="action_id"
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
          name="Display"
          idName="display_id"
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
          name="Workflow"
          idName="workflow_id"
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
  idName,
  setTabsModel,
  tabIndex,
  submitConfig,
}: {
  preValue: { name: string; id: string }[] | null;
  allInfo: [];
  name: string;
  idName: "workflow_id" | "action_id" | "display_id";
  setTabsModel: React.Dispatch<React.SetStateAction<configTab[]>>;
  tabIndex: number;
  submitConfig?: (newAction: string[], deletedAction: string[]) => void;
}) => {
  const [deletedActions, setDeletedActions] = React.useState<string[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<
    { [key: string]: any }[]
  >([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [insertedItems, setInsertedItems] = React.useState<Set<string>>(
    new Set()
  );
  React.useEffect(() => {
    setInsertedItems(new Set(preValue?.map((ele) => ele.id)));
  }, []);

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

  const cancelClick = () => {
    setSelectedItems([]);
    setDeletedActions([]);
    setInsertedItems(new Set(preValue?.map((ele) => ele.id)));
    updateTab(0);
  };

  const submitClick = () => {
    submitConfig?.(
      selectedItems.map((ele: any) => ele[idName]),
      deletedActions
    );
  };

  const LabelClick = (ele: any) => {
    setInsertedItems((insertedItems) => {
      insertedItems.add(ele[idName]);
      return insertedItems;
    });
    setSelectedItems([...selectedItems, ele]);
    updateTab(1);
  };

  return (
    <div className="my-2 p-3">
      <PreValue
        preValue={preValue}
        actions={deletedActions}
        setActions={setDeletedActions}
        updateTab={updateTab}
        setInsertedItems={setInsertedItems}
        name={name}
      />

      <NewValue
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        insertedItems={insertedItems}
        setInsertedItems={setInsertedItems}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        name={name}
        updateTab={updateTab}
        idName={idName}
      />

      <div className="flex flex-wrap gap-x-5 gap-y-2 my-2">
        {allInfo
          ?.filter((ele: any) => {
            if (searchValue === "") return true;
            if (ele.name.toLowerCase().includes(searchValue.toLowerCase()))
              return true;
            return false;
          })
          .map((ele: any, index: number) => {
            return (
              <Button
                key={index}
                className="flex justify-between items-center gap-2 !px-4 !py-2 !bg-green100 !border-green !text-green"
                disabled={insertedItems.has(ele[idName])}
                onClick={() => LabelClick(ele)}
                label={ele?.name}
              />
            );
          })}
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          label="Clear"
          className="px-5 py-2 mt-12"
          outlined
          onClick={cancelClick}
        />

        <Button
          label="Submit"
          className="px-5 py-2 mt-12"
          onClick={submitClick}
        />
      </div>
    </div>
  );
};

const PreValue = ({
  preValue,
  actions,
  setActions,
  updateTab,
  setInsertedItems,
  name,
}: {
  preValue: { name: string; id: string }[] | [] | null;
  actions: string[];
  setActions: React.Dispatch<React.SetStateAction<string[]>>;
  updateTab: (unsaved: number) => void;
  setInsertedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  name: string;
}) => {
  const filteredValue = React.useMemo(() => {
    return preValue?.filter((ele, id) => {
      if (actions.includes(ele.id)) {
        return false;
      }
      return true;
    });
  }, [preValue, actions]);

  const crossClick = (ele: any) => {
    setActions([...actions, ele.id]);
    updateTab(2);
    setInsertedItems((prev) => {
      prev.delete(ele.id);
      return prev;
    });
  };

  return (
    <div
      className={`flex items-center border border-surface-300 rounded-full my-2 p-2 gap-2`}
    >
      {preValue && preValue.length > 0 ? (
        filteredValue && filteredValue.length > 0 ? (
          filteredValue.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center w-fit rounded-full border border-red bg-red100 text-red py-1 px-2 gap-2 text-nowrap"
              >
                <div>{ele.name}</div>
                <div onClick={() => crossClick(ele)} className="cursor-pointer">
                  <XCircle size={15} className="relative scale-[1.2]" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-surface-400 py-1 border border-surface-0">
            No {name} Added
          </div>
        )
      ) : (
        <div className="text-surface-400 py-1 border border-surface-0">
          No {name} Added
        </div>
      )}
    </div>
  );
};

const NewValue = ({
  selectedItems,
  setSelectedItems,
  insertedItems,
  setInsertedItems,
  searchValue,
  setSearchValue,
  name,
  idName,
  updateTab,
}: {
  selectedItems: { [key: string]: any }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }[]>
  >;
  insertedItems: Set<string>;
  setInsertedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  idName: string;
  updateTab: (unsaved: number) => void;
}) => {
  const crossClick = (ele: any) => {
    setSelectedItems((prev) => {
      const newSelected = prev.filter(
        (item: any) => item[idName] !== ele[idName]
      );
      if (newSelected.length === 0) updateTab(0);
      else updateTab(1);
      return newSelected || [];
    });
    insertedItems.delete(ele.id);
    setInsertedItems((insertedItems) => {
      insertedItems.delete(ele[idName]);
      return insertedItems;
    });
  };
  return (
    <div className="flex items-center gap-8 ">
      <div className="flex items-center justify-between border-surface-300 p-4  outline-none border rounded-full min-w-96">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Search ${
            name.charAt(0).toUpperCase() + name.slice(1)
          }...`}
          className=" grow mx-1 outline-none bg-[transparent]"
        />
        <Search size={20} />
      </div>
      <div className="grow flex flex-wrap gap-2 items-center border border-surface-300 rounded-[30px] my-2 p-3">
        {selectedItems.length > 0 ? (
          selectedItems.map((ele: any, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center w-fit rounded-full bg-green100 border-green border text-green py-1 px-2 gap-2 text-nowrap"
              >
                <div>{ele.name}</div>
                <div onClick={() => crossClick(ele)} className="cursor-pointer">
                  <XCircle size={15} className="relative scale-[1.2]" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-surface-400 py-1 border border-surface-0">
            No {name} Added
          </div>
        )}
      </div>
    </div>
  );
};

const NameVal = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex items-center gap-20">
      <div className="!text-xl w-32 !text-surface-600">{name}</div>
      <div className="text-black !text-lg">{value}</div>
    </div>
  );
};

const BadgeArray = ({
  name,
  data,
  bgColor,
  textColor,
}: {
  name: string;
  data: string[] | null;
  bgColor: string;
  textColor: string;
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="!text-xl w-32 text-surface-600">{name}</div>
      {data?.slice(0, Math.min(5, data.length)).map((item: any, index: any) => (
        <div
          key={index}
          className={`bg-surface-300 text-primary py-1 px-2 rounded-full ${bgColor} ${textColor}`}
        >
          {item}
        </div>
      ))}
      {data ? (
        data?.length > 5 && (
          <div
            className={`m-auto rounded-full ${bgColor} ${textColor} h-8 w-8 flex justify-center items-center`}
          >
            +{data.length - 5}
          </div>
        )
      ) : (
        <>-</>
      )}
    </div>
  );
};
