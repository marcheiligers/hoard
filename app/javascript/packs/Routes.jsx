import React from "react";
import {
  Home,
  ContentPaste,
  Notifications,
  AccountCircle
} from "@material-ui/icons";
import HomeComponent from "./home/homeComponent";
import About from "./about/aboutComponent";
import Topics from "./topics/topicsComponent";

export const Versions = () => <div>v0.0.1</div>;

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
    path: "/topics",
    sidebarName: "Topics",
    navbarName: "Topics",
    icon: AccountCircle,
    component: Topics
  },
  {
    path: "/versions",
    sidebarName: "Versions",
    navbarName: "Versions",
    icon: AccountCircle,
    component: Versions
  }
];

export default Routes;
