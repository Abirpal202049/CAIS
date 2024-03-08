"use client";
import React, { useEffect } from "react";
import { useGetAllAlertType, useCreateAlertType } from "../_api/alert_config";
import Custom_Table from "@/components/common/Custom_Table";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

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
      field: "action_count",
      header: "Actions Count",
    },
    {
      field: "display_name_array",
      header: "Display",
    },
    {
      field: "display_count",
      header: "Display Count",
    },
    {
      field: "workflow_name_array",
      header: "Workflow",
    },
    {
      field: "workflow_count",
      header: "Workflow Count",
    },
    {
      field: "configured",
      header: "Configured",
    },
    {
      field: "confi-button",
      header: "",
    },
  ];

  const BadgeArray = ({ data }: any) => {
    return (
      <div className="flex flex-row gap-2">
        {data
          ?.slice(0, Math.min(3, data.length))
          .map((item: any, index: any) => (
            <div key={index} className="bg-pink text-surface-0 p-1 rounded-lg">
              {item}
            </div>
          ))}
        {!data && <>-</>}
      </div>
    );
  };

  const NumberBadge = ({ data }: any) => {
    return (
      <div className="m-auto rounded-full bg-primaryLight h-8 w-8 flex justify-center items-center text-surface-0">
        {data ? data : "0"}
      </div>
    );
  };
  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      case "action_name_array":
        return <BadgeArray data={data["action_name_array"]} />;
      case "action_count":
        return <NumberBadge data={data["action_name_array"]?.length} />;
      case "display_name_array":
        return <BadgeArray data={data["display_name_array"]} />;
      case "display_count":
        return <NumberBadge data={data["display_name_array"]?.length} />;
      case "workflow_name_array":
        return <BadgeArray data={data["workflow_name_array"]} />;
      case "workflow_count":
        return <NumberBadge data={data["workflow_name_array"]?.length} />;
      case "configured":
        return (
          <div className="flex justify-center">
            {data["configured"] ? (
              <CheckCircle2 className="text-green" />
            ) : (
              <XCircle className="text-red" />
            )}
          </div>
        );
      case "confi-button":
        return (
          <div className="flex flex-row">
            <Link href={`/admin/alert-type-config/${data["id"]}`}>
              <button className="b border p-1 rounded-lg">configure</button>
            </Link>
          </div>
        );
      default:
        return <div>{data[field]}</div>;
    }
  };

  return (
    <div className="overflow-hidden">
      <h2 className="!text-2xl">All Alert Type</h2>
      <Custom_Table
        data={data?.message}
        tableHeading="All Alert Type"
        columnFilter
        handleSwitch={handleSwitch}
        ResizableColumns
        showColumns={showColumns}
      />
    </div>
  );
}
