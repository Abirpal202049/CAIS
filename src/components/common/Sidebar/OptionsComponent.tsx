"use client"
import React , { Key } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import IconBtn from './Icon';
import { AppSidebarOptions } from '@/types/SidebarComponent';
import Styles from './Styles.module.scss'

const OptionsComponent = ({sidebarOpenState,menuList,sidebarSelected}:any) => {

  const pathname = usePathname();
  const route = pathname.split('/')[1]

  return (
    <div className={`${sidebarOpenState
        ? `${Styles.sidebar_menu_container_open}`
        : `${Styles.sidebar_menu_container_close}`
        } ${Styles.sidebar_menu_container}`}
    >
        {menuList?.map((option: AppSidebarOptions, index: Key) => {
            return (
                <Link key={index} href={option.link}>
                    <div
                        className={` ${!sidebarOpenState? `${Styles.sidebar_menu}`:`${Styles.sidebar_menu_open}`} ${sidebarSelected === option.link && "surface-200"
                            } ${sidebarOpenState ? `${Styles.menulist_open}` : `${Styles.menulist_close}` }`}
                    >
                        <IconBtn
                            alt={option.tabName}
                            height={option.size}
                            width={option.size}
                            iconName={option.iconName} 
                            enableIcons={sidebarSelected === option.link}
                            activeOnHover={true}
                            icon={<option.icon/>}
                            link={option.link}
                            route={route}
                        />
                        {sidebarOpenState && (
                            <div className={`${Styles.menulist_text} ${route===option.link?`${Styles.menulist_text_active}`:''}`}>
                            <p>
                                {option?.tabName}
                            </p>
                            </div>
                        )}
                    </div>
                </Link>
            );
        })}
    </div>
  )
}

export default OptionsComponent