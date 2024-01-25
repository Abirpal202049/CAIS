"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/alerts");
  });
  return (
    <>
      <h1>Cais </h1>
      {/* <Custom_Table
        tableType="alerts"
        select={true}
        columnFilter={true}
        data={data}
        handleSwitch={handleSwitch}
      /> */}
      <Link href="/login">Login</Link>
    </>
  );
}
