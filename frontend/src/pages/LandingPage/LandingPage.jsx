import styled from "styled-components";
import Hero from "./Hero";
import { Navigate } from "react-router-dom";
import routes from "../../utils/providers/router/routes";
import { useContext } from "react";
import { AuthContext } from "../../utils/providers/auth/authContext";

const LandingContainer = styled.main`
  display: flex;
  flex: 1;
`;

export default function LandingPage() {
  const [authState, _] = useContext(AuthContext);
  if (authState.id && authState.username) {
    return <Navigate to={routes.DASHBOARD_PATH} />;
  } else {
    return (
      <LandingContainer>
        <Hero />
      </LandingContainer>
    );
  }
}
