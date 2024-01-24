"use client"
import { SidebarProps } from "@/types";
import LogoVisibilityComponent from "./logoVisibilityComponent";
import OptionsComponent from "./OptionsComponent";
import Styles from './Styles.module.scss'
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";


export default function App_Sidebar({
    logoVisibility,
    menuList,
    sidebarSelected,
}: SidebarProps) {

    const [isHovered, setisHovered] = useState(false);
    const [onToggle, setOnToggle] = useState(false)

    const handleMouseEnter = () => {
        if (!onToggle) {
            setisHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!onToggle) {
            setisHovered(false);
        }
    };

    return (
        <div
            className={`${Styles.sidebar_container}`}
            style={{
                height: "100vh",
                width: isHovered ? "200px" : "50px",
            }}
        >
            <Sidebar
                id="sidebar"
                style={{
                    height: "100vh",
                    width: isHovered ? "200px" : "50px",
                }}
                visible={true}
                onHide={() => (false)}
                className={Styles.sidebar_div}
                unstyled={true}
                baseZIndex={0}
                dismissable={false}
                showCloseIcon={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`${Styles.sidebar_content_container}`}>
                    {/* Logo */}
                    <LogoVisibilityComponent logoVisibility={logoVisibility} sidebarOpenState={isHovered}
                        onClickTab={setOnToggle}
                        onToggle={onToggle}
                    />

                    <section
                        className={` ${Styles.sidebar_section} ${isHovered ? "" : "align-items-center"}`}
                    >

                        {/* Sidebar - Menu Options */}
                        <OptionsComponent
                            sidebarOpenState={isHovered}
                            menuList={menuList}
                            sidebarSelected={sidebarSelected}
                        />
                    </section>
                </div>
            </Sidebar>
        </div>
    );
}
