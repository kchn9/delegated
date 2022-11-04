import styled from "styled-components";
import Hero from "./Hero";
import userHelper from "../../utils/userHelper";
import { Navigate } from "react-router-dom";
import routes from "../../utils/providers/router/routes";

const LandingContainer = styled.main`
  display: flex;
  flex: 1;
`;

export default function LandingPage() {
  if (userHelper.hasToken()) {
    return <Navigate to={routes.DASHBOARD_PATH} />;
  } else {
    return (
      <LandingContainer>
        <Hero />
      </LandingContainer>
    );
  }
}
