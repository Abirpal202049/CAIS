"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/alerts/details");
  }, []);
  return (
    <>
      <h1>Cais - Home </h1>
    </>
  );
}
