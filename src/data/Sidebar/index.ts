import { Grid01, Report, Setting, homeSetting, menuCircleVertical, userCircleBlock } from "../svgr/sidebar";

export const sideBarOption = [
    {
      tabName: "Dashboard",
      link: "dashboard",
      iconName: "dashboard",
      size: 25,
      icon:Grid01
    },
    {
      tabName: "Incidents",
      link: "alerts",
      iconName: "warning",
      size: 27,
      icon:menuCircleVertical
    },
    {
      tabName: "Administrator",
      link: "admin",
      iconName: "user-circle-block",
      size: 29,
      icon:userCircleBlock
    },
    {
      tabName: "Settings",
      link: "setting",
      iconName: "setting",
      size: 30,
      icon:Setting
    },
    {
      tabName: "Next Gen AI",
      link: "next-gen-ai",
      iconName: "home-setting",
      size: 27,
      icon:homeSetting
    },
    {
      tabName: "Reports",
      link: "reports",
      iconName: "reports",
      size: 25,
      icon:Report
    },
  ];
  