"use client";
import React from "react";
import styles from "../Custom_Tab/custom_tab.module.scss";
import { useRouter } from "next/navigation";

type props = {
  TabsModel: {
    label: string;
    value: string;
    count?: number;
    redirect?: string;
  }[];
  selectedTabIndex: number;
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Custom_Tab: React.FC<props> = ({
  TabsModel,
  selectedTabIndex,
  setSelectedTabIndex,
}) => {
  const router = useRouter();
  return (
    <div className={styles.tabMenu}>
      {TabsModel.map((ele, idx) => {
        return (
          <div
            key={idx}
            className={`${styles.tab} ${
              idx === selectedTabIndex ? styles.active : ""
            }`}
            onClick={() => {
              alert("hello");
              setSelectedTabIndex(idx);
              if (ele.redirect) router.push(ele.redirect);
            }}
          >
            <div>{ele.label}</div>
            {ele.count && (
              <div className={`${styles.countData}`}>{ele.count}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Custom_Tab;
