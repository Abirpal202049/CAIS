"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  timeout: 10000,
});

const getAllAlerts = async () => {
  const res = await BASE_INSTANCE.get("/alerts"); // this is an example
  return res.data;
};

export const useGetAllAlerts = () => {
  return useQuery({
    queryKey: ["allAlerts"],
    queryFn: getAllAlerts,
  });
};

const createAlert = async (data: any) => {
  const res = await BASE_INSTANCE.post("/alerts", data);
  return res.data;
};

export const useCreateAlert = () => {
  return useMutation({
    mutationKey: ["createAlert"],
    mutationFn: createAlert,
  });
};
