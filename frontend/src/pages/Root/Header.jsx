import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import routes from "../../utils/providers/router/routes";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

import LogoSrc from "../../assets/delegated-logo.png";
import LoginIcon from "../../assets/icons/login.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

import { useContext } from "react";
import { AuthContext } from "../../utils/providers/auth/authContext";

const HeaderWrapper = styled.header`
  position: ${(props) => (props.opacityMode ? "absolute" : "sticky")};
  right: ${(props) => (props.opacityMode ? "0" : "unset")};
  left: ${(props) => (props.opacityMode ? "0" : "unset")};
  background-color: ${(props) =>
    props.opacityMode ? "rgba(255, 255, 255, 0.86)" : "var(--white)"};

  display: flex;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0.2em 1.5em;
  z-index: 100;

  @media only screen and ${breakpoints.tablet} {
    padding: 0.3em 4em;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0.3em 8em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.4em 15em;
  }
`;

function SignInButton() {
  return (
    <Link to={routes.LOGIN_PATH} style={{ textDecoration: "none" }}>
      <Button backgroundColor={"var(--secondary)"}>
        <Icon src={LoginIcon} height="20px" width="24px"></Icon>
        Sign in
      </Button>
    </Link>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const [_, setAuthState] = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setAuthState({
      id: "",
      username: "",
    });
    navigate(routes.HOME_PATH);
  }

  return (
    <Button onClick={() => handleLogout()} backgroundColor={"var(--secondary)"}>
      <Icon src={LogoutIcon} height="20px" width="24px"></Icon>
      Logout
    </Button>
  );
}

export default function Header({ opacityMode }) {
  const [authState, _] = useContext(AuthContext);

  return (
    <HeaderWrapper opacityMode={opacityMode}>
      <Link
        to={
          authState && authState.id && authState.username
            ? routes.TRIPS_PATH
            : routes.HOME_PATH
        }
      >
        <Logo src={LogoSrc} height="60px" width="140px" />
      </Link>
      {authState && authState.id && authState.username ? (
        <LogoutButton />
      ) : (
        <SignInButton />
      )}
    </HeaderWrapper>
  );
}
