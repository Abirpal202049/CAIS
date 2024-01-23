import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Custom_Table from "@/components/common/Custom_Table";
export default function Home() {
  return (
    <>
      <h1>Cais </h1>
      <Custom_Table tableType="alerts"/>
      <Link href="/login">Login</Link>
    </>
  );
}
