"use client";
import React, { Key, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";

import IconBtn from "./Icon";
import { AppSidebarOptions } from "@/types/SidebarComponent";
import Styles from "./Styles.module.scss";
import { ChevronDown } from "lucide-react";

const OptionsComponent = ({
  sidebarOpenState,
  menuList,
  sidebarSelected,
}: any) => {
  const pathname = usePathname();
  const route = pathname.split("/")[1];
  const btnRef3 = useRef(null);

  return (
    <div
      className={`${sidebarOpenState
        ? `${Styles.sidebar_menu_container_open}`
        : `${Styles.sidebar_menu_container_close}`
        } ${Styles.sidebar_menu_container}`}
    >
      {menuList?.map((option: AppSidebarOptions, index: Key) => {
        return (
          <div key={index}>
            <div
              className={` ${!sidebarOpenState
                ? `${Styles.sidebar_menu}`
                : `${Styles.sidebar_menu_open}`
                } ${sidebarSelected === option.link && "surface-200"} ${sidebarOpenState
                  ? `${Styles.menulist_open}  ${option?.options && option?.options?.length > 0 ? '':'hover:bg-surface-200'}`
                  : `${Styles.menulist_close} `
                }`}
            >
              <IconBtn
                alt={option.tabName}
                height={option.size}
                width={option.size}
                iconName={option.iconName}
                enableIcons={sidebarSelected === option.link}
                activeOnHover={true}
                icon={option.icon}
                link={option.link}
                route={route}
              />
              {sidebarOpenState && (
                <div
                  className={`${Styles.menulist_text} ${route === option.link
                    ? `${Styles.menulist_text_active}`
                    : ""
                    }`}
                >
                  {option?.options && option?.options?.length > 0 ? (
                    <div className="p-[3px] ml-[-5px]">
                      <StyleClass
                        nodeRef={btnRef3}
                        selector=".tab"
                        enterClassName="hidden"
                        leaveToClassName="hidden"
                      >
                        <a ref={btnRef3} className="flex gap-2">
                          <span className="font-medium">{option?.tabName}</span>
                          <ChevronDown style={{ color: "gray" }} size={20} />
                          <Ripple />
                        </a>
                      </StyleClass>
                      <ul className="list-none tab w-full ml-[-1.2rem] hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                        {
                          option?.options.map((opt) => (
                            <li key={opt.tabName} className="flex  ">
                              {/* <homeSetting className={Styles.nestedIcon}/> */}
                              <Link href={`${opt.link}`} className={`flex cursor-pointer  hover:surface-100 transition-duration-150 transition-colors items-center gap-1 w-full justify-evenly hover:bg-surface-200 rounded p-3`}>
                                <IconBtn
                                  alt={opt.tabName}
                                  height={opt.size}
                                  width={opt.size}
                                  iconName={opt.iconName}
                                  enableIcons={sidebarSelected === opt.link}
                                  activeOnHover={true}
                                  icon={opt.icon}
                                  link={opt.link}
                                  route={route}
                                />
                                <span className="font-medium !text-base w-full">{opt.tabName}</span>
                              </Link>
                            </li>
                          ))
                        }

                      </ul>
                    </div>
                  ) : (
                    <Link href={option.link} >
                      <p>{option?.tabName}</p>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* <div className={`${Styles.nested_sidebar_components} expand hidden`}>
                            {option?.options && option?.options?.length > 0 && sidebarOpenState && (
                                <div className={`${Styles.submenu_container}`} >
                                    {option?.options?.map((subOption: AppSidebarOptions, index: Key) => {
                                        return (
                                            <Link key={index} href={`${option.link}/${subOption.link}`}>
                                                <div
                                                    className={`${Styles.submenu} ${route === subOption.link ? `${Styles.submenu_active}` : ''}`}
                                                >
                                                    <IconBtn
                                                        alt={subOption.tabName}
                                                        height={subOption.size}
                                                        width={subOption.size}
                                                        iconName={subOption.iconName}
                                                        enableIcons={sidebarSelected === subOption.link}
                                                        activeOnHover={true}
                                                        icon={<subOption.icon />}
                                                        link={subOption.link}
                                                        route={route}
                                                    />
                                                    <div className={`${Styles.menulist_text} ${route === subOption.link ? `${Styles.menulist_text_active}` : ''}`}>
                                                        <p>
                                                            {subOption?.tabName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default OptionsComponent;
