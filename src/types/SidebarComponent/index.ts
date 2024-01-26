export interface AppSidebarOptions {
  tabName: string;
  link: string;
  iconName: string;
  size: number;
  icon: React.ReactNode;
  options?: AppSidebarOptionsList;
}
type AppSidebarOptionsList = AppSidebarOptions[];

export interface SidebarProps {
  logoVisibility: boolean;
  menuList: AppSidebarOptionsList;
  sidebarSelected: string;
  onClickTab?: Function;
  onToggle?: Boolean;
}

export interface IconBtnProps {
  iconName?: string;
  width: Number;
  height: Number;
  alt?: string;
  enableIcons: boolean;
  activeOnHover: boolean;
  icon: React.ReactNode;
  link: string;
  route: string;
}
