import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import {
  Root,
  LandingPage,
  Dashboard,
  RegisterPage,
  LoginPage,
} from "../../../pages";

export default createBrowserRouter([
  {
    path: routes.ROOT_PATH,
    element: <Root />,
    children: [
      {
        path: routes.HOME_PATH,
        element: <LandingPage />,
      },
      {
        path: routes.DASHBOARD_PATH,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: routes.LOGIN_PATH,
    element: <LoginPage />,
  },
  {
    path: routes.REGISTER_PATH,
    element: <RegisterPage />,
  },
]);
