"use client"
import Image from 'next/image'
import Link from 'next/link'
import Styles from './Styles.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from "@/Redux/slices/Dashboard/sidebarSlice";


const LogoVisibilityComponent = ({ sidebarOpenState, logoVisibility,onClickTab,onToggle }: any) => {

    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state:any) => state.sideBar.sidebarOpen);

    const handleToggle = () =>{
        onClickTab(!onToggle);
        dispatch(toggleSidebar());
        console.log(isSidebarOpen)
    }

    return (
        <div>
            {logoVisibility && (
                <div
                    className={Styles.sidebar_logo_visibility}
                    style={{
                        width: sidebarOpenState ? "100%" : "60px",
                    }}
                >
                    {sidebarOpenState ? (
                        <div className={Styles.sidebar_logo}>
                            <Link href="/alerts">
                                <Image
                                    src="/CaisFullLogo.svg"
                                    width={150}
                                    height={50}
                                    alt="Logo"
                                />
                            </Link>
                            <div className={Styles.toggle_dot_container}>
                                <div onClick={handleToggle} className={`${onToggle ? `${Styles.toggle_dot_open}` : ''} ${Styles.toggle_dot}`}>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.sidebar_logo}>
                            <Link href="/alerts">
                                <Image
                                    src="/logo.svg"
                                    width={40}
                                    height={40}
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default LogoVisibilityComponent