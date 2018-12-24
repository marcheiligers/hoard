import React from "react";
import {
  Home,
  ContentPaste,
  Notifications,
  AccountCircle
} from "@material-ui/icons";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics, { Topic } from "./topics/topicsComponent";
import Versions from "./versions/versionsComponent";

const Routes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Home",
    icon: Home,
    component: HomeComponent
  },
  {
    path: "/about",
    sidebarName: "About",
    navbarName: "About",
    icon: AccountCircle,
    component: About
  },
  {
    path: "/versions",
    sidebarName: "Versions",
    navbarName: "Versions",
    icon: AccountCircle,
    component: Versions
  },
  {
    path: "/topics",
    sidebarName: "Topics",
    navbarName: "Topics",
    icon: AccountCircle,
    component: Topics
  }
];

export default Routes;
