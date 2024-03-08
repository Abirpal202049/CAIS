"use client";
import React from "react";
import styles from "../Custom_Tab/custom_tab.module.scss";
import { useRouter } from "next/navigation";
import { Dot } from "lucide-react";

type props = {
  TabsModel: {
    label: string;
    value: string;
    count?: number;
    redirect?: string;
    unsaved?: number;
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
              setSelectedTabIndex(idx);
              if (ele.redirect) router.push(ele.redirect);
            }}
          >
            <div
              className={`flex items-center !text-lg relative ${
                "unsaved" in ele ? "px-2" : ""
              }`}
            >
              {ele.label}
              {"unsaved" in ele ? (
                <Dot
                  size={20}
                  className={`absolute scale-[2] text-primaryLight -right-3 ${
                    ele.unsaved === 0 ? "opacity-0" : ""
                  }`}
                />
              ) : (
                ""
              )}{" "}
            </div>
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
