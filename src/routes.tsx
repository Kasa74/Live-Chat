import MainPage from "./pages/MainPage/MainPage";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import { InstallationPage } from "./pages/InstallationPage/InstallationPage";
import { Confirm } from "./Components/Confirm/Confirm";

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
    path: "/confirm" + "/:id",
    element: <Confirm />,
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
