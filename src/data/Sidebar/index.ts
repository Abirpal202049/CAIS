import {
  Grid01,
  Report,
  Setting,
  homeSetting,
  menuCircleVertical,
  userCircleBlock,
} from "../svgr/sidebar";

export const sideBarOption = [
  {
    tabName: "Dashboard",
    link: "dashboard",
    iconName: "dashboard",
    size: 25,
    icon: Grid01,
  },
  {
    tabName: "Incidents",
    link: "alerts",
    iconName: "warning",
    size: 25,
    icon: menuCircleVertical,
  },
  {
    tabName: "Administrator",
    link: "/admin",
    iconName: "user-circle-block",
    size: 25,
    icon: userCircleBlock,
    options: [
      {
        tabName: "Alert Type Configuration",
        link: "alert-type-config",
        iconName: "user-circle-block",
        size: 20,
        icon: userCircleBlock,
      },
      {
        tabName: "Workflow Configuration",
        link: "workflow-config",
        iconName: "user-circle-block",
        size: 20,
        icon: userCircleBlock,
      },
      {
        tabName: "Display Configuration",
        link: "display-config",
        iconName: "user-circle-block",
        size: 20,
        icon: userCircleBlock,
      },
      {
        tabName: "Action Configuration",
        link: "action-config",
        iconName: "user-circle-block",
        size: 20,
        icon: userCircleBlock,
      },
      {
        tabName: "User Confiugration",
        link: "admin/user-management",
        iconName: "user-circle-block",
        size: 20,
        icon: userCircleBlock,
      },
    ],
  },
  {
    tabName: "Settings",
    link: "setting",
    iconName: "setting",
    size: 30,
    icon: Setting,
  },
  {
    tabName: "Next Gen AI",
    link: "next-gen-ai",
    iconName: "home-setting",
    size: 25,
    icon: homeSetting,
  },
  {
    tabName: "Reports",
    link: "reports",
    iconName: "reports",
    size: 25,
    icon: Report,
  },
];
