import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Custom_Table from "@/components/common/Custom_Table";
import Custom_Tab from "@/components/common/Custom_Tab";

export default function Home() {
  return (
    <>
      <h1>Cais </h1>
      <Custom_Tab />
      <Custom_Table tableType="alerts" select={true} columnFilter={true} />
      <Link href="/login">Login</Link>
    </>
  );
}
