import Link from "next/link";
import { ReactNode } from "react";
import styles from "./dashboard.module.scss";
import SidebarMainComponent from "@/components/common/Sidebar/SidebarMainComponent";
type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className={styles._dashboard_container_body}>
      <SidebarMainComponent />
      <h1>DashboardLayout</h1>
      <div>{children}</div>
    </div>
  );
}
