"use client"
import React from 'react'
import { sideBarOption } from "@/data/Sidebar";
import '@/components/Styles.scss'
import App_Sidebar from '.';

const SidebarMainComponent = () => {
    return (
        <div>
            <App_Sidebar
            logoVisibility
            menuList={sideBarOption}
            sidebarSelected={'/alerts'}
        />
      </div>
    )
}

export default SidebarMainComponent