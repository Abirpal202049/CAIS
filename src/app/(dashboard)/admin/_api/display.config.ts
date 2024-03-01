"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  timeout: 10000,
});


const createDiaplayType = async (data: any) => {
    console.log("data :",data)
    const res = await BASE_INSTANCE.post("/display/create", data);
    return res.data;
  };
  
  export const useCreateDisplayType = () => {
    return useMutation({
      mutationKey: ["createDisplayType"],
      mutationFn: createDiaplayType,
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