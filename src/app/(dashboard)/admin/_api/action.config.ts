"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  timeout: 10000,
});

export const useCreateActionType = () => {
  return useMutation({
    mutationKey: ["createAction"],
    mutationFn: postActions,
  });
};

const postActions = async (data: any) => {
  const res = await BASE_INSTANCE.post("/action/create", data);
  return res.data;
};

export const useGetActions = () => {
  return useQuery({
    queryKey: ["allActions"],
    queryFn: getAllActions,
  });
};

const getAllActions = async (data: any) => {
  const res = await BASE_INSTANCE.get("/action");
  return res.data;
};

const postActionAlertConfig = async (id: string, data: any) => {
  const res = await BASE_INSTANCE.post(`/action/config/create/${id}`, data);
  return res.data;
};

export const usePostActionAlertConfig = (id: string) => {
  return useMutation({
    mutationKey: ["postActionAlertConfig"],
    mutationFn: (data: { newAction: string[]; deletedAction: string[] }) =>
      postActionAlertConfig(id, data),
  });
};
