import { Component } from "react";
import MainPage from "./pages/MainPage/MainPage";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";

export const routes = [
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "/account",
    Component: PersonalAccount,
  },
];
