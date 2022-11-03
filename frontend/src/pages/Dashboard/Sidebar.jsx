import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import routes from "../../utils/providers/router/routes";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  height: 80vh;
  border-right: 1px solid var(--grey);
`;

const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeText = styled.span`
  font-weight: bold;
  font-size: 1.1em;
`;

const UsernameText = styled.span`
  margin: 0.4em 0;
`;

const ActionsContainer = styled.div`
  margin-top: 1.6em;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--grey);
  margin: 1.6em 2em 1.6em 0;

  & > button:last-child {
    margin-bottom: 1.6em;
  }
`;

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 0 2em 1.6em 0;

  & > a {
    margin-bottom: 0.8em;
  }
  & > a:last-child {
    margin-bottom: 1.6em;
  }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <GreetingsContainer>
        <WelcomeText>Welcome back!</WelcomeText>
        <UsernameText>user.username</UsernameText>
      </GreetingsContainer>
      <ActionsContainer>
        <Button
          backgroundColor="var(--accent)"
          color="var(--black)"
          hoverBackgroundColor="none"
        >
          Add a trip
        </Button>
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
