 interface AppSidebarOptions {
    tabName: string;
    link: string;
    iconName: string;
    size: number;
    icon:React.ReactNode
}
 type AppSidebarOptionsList = AppSidebarOptions[];


export interface SidebarProps {
    logoVisibility: boolean;
    menuList: AppSidebarOptionsList;
    sidebarSelected: string;
    onClickTab?: Function;
    onToggle?: Boolean;
}