import Link from "next/link";
import { ReactNode } from "react";
import '@/components/Styles.scss'
import SidebarMainComponent from "@/components/common/Sidebar/SidebarMainComponent";
type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {

  return (
    <div>
        <SidebarMainComponent/>
      <h1>DashboardLayout</h1>
      <div>{children}</div>
      <ol>
        <li><Link href={"/dashboard"}>Dashboard</Link></li>
        <li><Link href={"/alerts"}>Alert</Link></li>
        <li>
            <ul>
                <li><Link href={"/admin/alert-type-config"}>Alert Type Config</Link></li>
                <li><Link href={"/admin/user-config"}>User Config</Link></li>
                <li><Link href={"/admin/workflow-config"}>Workflow Config</Link></li>
            </ul>
        </li>
        <li><Link href={"/settings"}>Setting</Link></li>
        <li><Link href={"/reports"}>Reports</Link></li>
      </ol>
    </div>
  );
}
