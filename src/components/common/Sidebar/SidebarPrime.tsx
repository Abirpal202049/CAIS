import { Sidebar } from "primereact/sidebar";
import React from "react";
import Styles from "./Styles.module.scss";
import LogoVisibilityComponent from "./logoVisibilityComponent";
import OptionsComponent from "./OptionsComponent";

const SidebarPrime = ({
  isHovered,
  onToggle,
  setisHovered,
  logoVisibility,
  setOnToggle,
  menuList,
  sidebarSelected,
}: any) => {
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
    <div>
      <Sidebar
        id="sidebar"
        style={{
          height: "100vh",
          width: isHovered
            ? "var(--sidebar-width-expand)"
            : "var(--sidebar-width-collapse)",
        }}
        visible={true}
        onHide={() => false}
        className={Styles.sidebar_div}
        unstyled={true}
        // baseZIndex={1}
        dismissable={false}
        showCloseIcon={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        header={() => (
          <LogoVisibilityComponent
            logoVisibility={logoVisibility}
            sidebarOpenState={isHovered}
            onClickTab={setOnToggle}
            onToggle={onToggle}
          />
        )}
        pt={{
          mask: {
            style: {
              height: "100vh",
              width: isHovered
                ? "var(--sidebar-width-expand)"
                : "var(--sidebar-width-collapse)",
            },
            alignItems: "start",
            zIndex: 9999,
          },
        }}

        content={({ closeIconRef, hide }) => (
          <div>
            <LogoVisibilityComponent
              logoVisibility={logoVisibility}
              sidebarOpenState={isHovered}
              onClickTab={setOnToggle}
              onToggle={onToggle}
            />

            <section
              className={` ${Styles.sidebar_section} ${isHovered ? "" : "align-items-center"
                }`}
            >
              {/* Sidebar - Menu Options */}
              <OptionsComponent
                sidebarOpenState={isHovered}
                menuList={menuList}
                sidebarSelected={sidebarSelected}
              />
            </section>
          </div>
        )}
      >

      </Sidebar>
    </div>
  );
};

export default SidebarPrime;
