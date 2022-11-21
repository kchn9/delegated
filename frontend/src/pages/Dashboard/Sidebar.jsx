import styled from "styled-components";
import Button from "../../components/Button";
import { Link, NavLink } from "react-router-dom";
import routes from "../../utils/providers/router/routes";
import breakpoints from "../../theme/breakpoints";

import { useContext } from "react";
import { AuthContext } from "../../utils/providers/auth/authContext";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--grey);
  padding: 0.1em 1.5em;

  @media only screen and ${breakpoints.tablet} {
    height: 80vh;
    padding: 0;
    border-right: 1px solid var(--grey);
    border-bottom: none;
  }
`;

const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-bottom: 1em;

  @media only screen and ${breakpoints.tablet} {
    text-align: unset;
    padding-bottom: unset;
  }
`;

const WelcomeText = styled.span`
  font-weight: bold;
  font-size: 1.1em;
`;

const UsernameText = styled.span`
  margin: 0.4em 0;
  color: var(--primary);
`;

const ActionsContainer = styled.div`
  @media only screen and ${breakpoints.tablet} {
    border-bottom: 1px solid var(--grey);

    margin: 1.6em 2em 1.6em 0;
  }
`;

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;

  @media only screen and ${breakpoints.tablet} {
    margin: 0 2em 1.6em 0;
  }

  & > a {
    margin-bottom: 0.8em;
  }
  & > a:last-child {
    margin-bottom: 1.6em;
  }
`;

export default function Sidebar() {
  const [authState, _] = useContext(AuthContext);

  return (
    <SidebarContainer>
      <GreetingsContainer>
        <WelcomeText>Welcome back!</WelcomeText>
        <UsernameText>Logged as {authState.username}</UsernameText>
      </GreetingsContainer>
      <ActionsContainer>
        <Link
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
            marginBottom: "1.6em",
          }}
          to={routes.NEW_TRIP_PATH}
        >
          <Button
            backgroundColor="var(--accent)"
            color="var(--black)"
            hoverBackgroundColor="none"
          >
            Add a trip
          </Button>
        </Link>
      </ActionsContainer>
      <NavigationContainer>
        <NavLink
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
          to={routes.TRIPS_PATH}
        >
          {({ isActive }) => (
            <Button
              outlineColor="var(--secondary)"
              color={isActive ? "var(--white)" : "var(--black)"}
              hoverColor={!isActive && "var(--white)"}
              backgroundColor={isActive ? "var(--secondary)" : "var(--white)"}
              hoverBackgroundColor={!isActive && "var(--secondary)"}
            >
              Trips
            </Button>
          )}
        </NavLink>
        <NavLink
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
          to={routes.MAP_PATH}
        >
          {({ isActive }) => (
            <Button
              outlineColor="var(--secondary)"
              color={isActive ? "var(--white)" : "var(--black)"}
              hoverColor={!isActive && "var(--white)"}
              backgroundColor={isActive ? "var(--secondary)" : "var(--white)"}
              hoverBackgroundColor={!isActive && "var(--secondary)"}
            >
              Map
            </Button>
          )}
        </NavLink>
      </NavigationContainer>
    </SidebarContainer>
  );
}
