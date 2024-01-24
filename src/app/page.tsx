import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Attachment } from "@/data/svgr/Filters";
import Styles from '@/data/svgr/Styles.module.scss'

export default function Home() {
  return (
    <>
    <Attachment className={Styles.icon}/>
      <h1>Cais </h1>
      <Link href="/login">Login</Link>
    </>
  );
}
