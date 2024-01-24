import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Custom_Table from "@/components/common/Custom_Table";
import Custom_Tab from "@/components/common/Custom_Tab";
import { Attachment } from "@/data/svgr/Filters";
import Styles from "@/data/svgr/Styles.module.scss";

export default function Home() {
  return (
    <>
      <Attachment className={Styles.icon} />
      <h1>Cais </h1>
      <Custom_Tab />
      <Custom_Table tableType="alerts" select={true} columnFilter={true} />
      <Link href="/login">Login</Link>
    </>
  );
}
