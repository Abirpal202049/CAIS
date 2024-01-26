import { ReactNode } from "react";
import SidebarMainComponent from "@/components/common/Sidebar/SidebarMainComponent";
import WidthProvider from "@/components/Providers/widthProvider";
import MainSection from "@/components/common/Navbar/MainSection";
import styles from "./dashboard.module.scss";
type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      <WidthProvider>
        <SidebarMainComponent />
        {/* <h1>DashboardLayout</h1> */}
        <div>
          <MainSection />
          <div className={styles._dashboard_background}>
            {children}
          </div>
        </div>
      </WidthProvider>
    </div>
  );
}
