import styled from "styled-components";
import routes from "../../utils/providers/router/routes";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RootWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Root() {
  const { pathname } = useLocation();
  if (pathname === routes.ROOT_PATH) {
    return <Navigate to={routes.HOME_PATH} />;
  }

  return (
    <RootWrapper>
      <Header opacityMode={pathname === routes.HOME_PATH} />
      <Outlet />
      <Footer />
    </RootWrapper>
  );
}
