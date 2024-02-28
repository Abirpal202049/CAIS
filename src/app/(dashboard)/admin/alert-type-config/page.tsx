"use client";
import React, { useEffect } from "react";
import { useGetAllAlertType, useCreateAlertType } from "../_api/alert_config";
import Custom_Table from "@/components/common/Custom_Table";

type Props = {};

export default function AlertTypePage({ }: Props) {
  const { data, isLoading, isError } = useGetAllAlertType();
  const { mutate, data: abd, isPending } = useCreateAlertType();

  const handleSwitch = (data: any, field: any) => {
    switch (field) {
      default:
        return <div>{data[field]}</div>;
    }
  };
  return (
    <div>
      <h2 className="!text-2xl">All Alert Type</h2>
      {!isLoading && (
        <Custom_Table data={data?.message} handleSwitch={handleSwitch} />
      )}
    </div>
  );
}
