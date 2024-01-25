import { ReactNode } from "react";
import SidebarMainComponent from "@/components/common/Sidebar/SidebarMainComponent";
import WidthProvider from "@/components/Providers/widthProvider";
type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div >
      <WidthProvider>
      <SidebarMainComponent />
      {/* <h1>DashboardLayout</h1> */}
      <div>{children}</div>
      </WidthProvider>
    </div>
  );
}
