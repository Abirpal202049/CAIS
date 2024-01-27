import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        <ProductList />
      </div>
    </>
  );
}
