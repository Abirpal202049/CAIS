"use client"
import React from "react"
import { useSelector } from 'react-redux';
import Styles from '@/app/(dashboard)/dashboard.module.scss'
const WidthProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const isSidebarOpen = useSelector((state:any) => state.sideBar.sidebarOpen);
  return (
    <div className={`${isSidebarOpen?`${Styles._dashboard_container_body_expand}`:`${Styles._dashboard_container_body}`}`}>
        {children}
    </div>
  )
}

export default WidthProvider