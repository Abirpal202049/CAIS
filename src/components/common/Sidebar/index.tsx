"use client";
import { SidebarProps } from "@/types/SidebarComponent";
import Styles from "./Styles.module.scss";
import { useState } from "react";
import SidebarPrime from "./SidebarPrime";

export default function App_Sidebar({
  logoVisibility,
  menuList,
  sidebarSelected,
}: SidebarProps) {
  const [isHovered, setisHovered] = useState(false);
  const [onToggle, setOnToggle] = useState(false);

  return (
    <div
      className={`${Styles.sidebar_container}`}
      style={{
        height: "100vh",
        width: isHovered
          ? "var(--sidebar-width-expand)"
          : "var(--sidebar-width-collapse)",
      }}
    >
      <SidebarPrime
        isHovered={isHovered}
        onToggle={onToggle}
        setisHovered={setisHovered}
        logoVisibility={logoVisibility}
        setOnToggle={setOnToggle}
        menuList={menuList}
        sidebarSelected={sidebarSelected}
      />
    </div>
  );
}
