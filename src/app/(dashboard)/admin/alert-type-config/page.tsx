"use client";
import React, { useEffect } from "react";
import { useGetAllAlertType, useCreateAlertType } from "../_api/alert_config";
import Custom_Table from "@/components/common/Custom_Table";

type Props = {};

export default function AlertTypePage({}: Props) {
  const { data, isLoading, isError } = useGetAllAlertType();
  const { mutate, data: abd, isPending } = useCreateAlertType();

  const handleSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        alert("success");
      },
      onError: (err) => {
        alert("error");
      },
      onSettled: (data, error) => {
        alert("settled");
      },
    });
  };
  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      default:
        return <div>{data[field]}</div>;
    }
  };

  const showColumns = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "identifier",
      header: "Identifier",
    },
    {
      field: "action_name_array",
      header: "Actions",
    },
    {
      field: "action_id_array",
      header: "Actions Count",
    },
    {
      field: "display_name_array",
      header: "Display",
    },
    {
      field: "display_id_array",
      header: "Display Count",
    },
    {
      field: "workflow_name_array",
      header: "Workflow",
    },
    {
      field: "workflow_id_array",
      header: "Workflow Count",
    },
    {
      field: "configured",
      header: "Configured",
    },
  ];
  return (
    <div>
      <h2 className="!text-2xl">All Alert Type</h2>
      {!isLoading && (
        <Custom_Table
          data={data?.message}
          handleSwitch={handleSwitch}
          showColumns={showColumns}
        />
      )}
    </div>
  );
}
