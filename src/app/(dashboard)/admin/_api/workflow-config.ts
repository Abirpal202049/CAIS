"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  timeout: 10000,
});

const createWorkflowType = async (data: any) => {
  const res = await BASE_INSTANCE.post("/workflow/create", data);
  return res.data;
};

export const useCreateWorkflowType = () => {
  return useMutation({
    mutationKey: ["createWorkflow"],
    mutationFn: createWorkflowType,
  });
};

export const useGetWorkflow = () => {
  return useQuery({
    queryKey: ["allWorkflow"],
    queryFn: getAllWorkflow,
  });
};

const getAllWorkflow = async () => {
  const res = await BASE_INSTANCE.get("/workflow");
  return res.data;
};

const postWorkflowAlertConfig = async (id: string, data: any) => {
  const res = await BASE_INSTANCE.post(`/workflow/config/create/${id}`, data);
  return res.data;
};

export const usePostWorkflowAlertConfig = (id: string) => {
  return useMutation({
    mutationKey: ["postWorkflowAlertConfig"],
    mutationFn: (data: { newWorkflow: string[]; deletedWorkflow: string[] }) =>
      postWorkflowAlertConfig(id, data),
  });
};
