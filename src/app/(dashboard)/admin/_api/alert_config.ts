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

export const useGetActions = () => {
  return useQuery({
    queryKey: ["allActions"],
    queryFn: getAllActions,
  });
};

export const useGetDisplay = () => {
  return useQuery({
    queryKey: ["allDisplay"],
    queryFn: getAllDisplay,
  });
};

const getAllDisplay = async (data: any) => {
  const res = await BASE_INSTANCE.get("/display");
  return res.data;
};

const getAllActions = async (data: any) => {
  const res = await BASE_INSTANCE.get("/action");
  return res.data;
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

const getAllAlertType = async () => {
  const res = await BASE_INSTANCE.get("/alert-type");
  return res.data;
};

export const useGetAllAlertType = () => {
  return useQuery({
    queryKey: ["allAlertType"],
    queryFn: getAllAlertType,
  });
};

const createAlertType = async (data: any) => {
  const res = await BASE_INSTANCE.post("/alerts", data);
  return res.data;
};

export const useCreateAlertType = () => {
  return useMutation({
    mutationKey: ["createAlertType"],
    mutationFn: createAlertType,
  });
};
