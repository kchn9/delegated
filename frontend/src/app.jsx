import styled from "styled-components";
import routes from "./routes";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Footer from "./components/Footer";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: routes.HOME_PATH,
    element: <LandingPage />,
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

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <RouterProvider router={router} />
      <Footer />
    </AppWrapper>
  );
}
