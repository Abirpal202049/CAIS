import React from "react";
import Styles from './Styles.module.scss'

interface IconBtnProps {
  iconName?: string;
  width: Number;
  height: Number;
  alt?: string;
  enableIcons: boolean;
  activeOnHover: boolean;
  icon:React.ReactNode,
  link:string,
  route:string,
}

export default function IconBtn({
  iconName,
  width,
  height,
  alt,
  enableIcons,
  activeOnHover,
  icon,
  link,
  route
}: IconBtnProps) {

  return (
    <div className={`cursor-pointer ${Styles.icon_container} ${route==link?`${Styles.icon_active}`:''}`}>
      <div
        className={`${enableIcons ? "hidden " : "block p-1"} cursor-pointer`}
      >
        {icon}

      </div>
    </div>
  );
}
