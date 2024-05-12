import MainPage from "./pages/MainPage/MainPage";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import { InstallationPage } from "./pages/InstallationPage/InstallationPage";

export const publicRoutes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/installation",
    element: <InstallationPage />,
  },
  {
    path: "*",
    element: <MainPage />,
  },
];
export const authRoutes = [
  {
    path: "/account",
    element: <PersonalAccount />,
  },
];
