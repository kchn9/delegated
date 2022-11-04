import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Divider from "../../components/Divider";
import UserForm from "../../components/UserForm";
import AlreadyUserSection from "./AlreadyUserSection";
import { Link, Navigate } from "react-router-dom";
import routes from "../../utils/providers/router/routes";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import userHelper from "../../utils/userHelper";

import HomeIcon from "../../assets/icons/home.svg";

const Heading = styled.h1`
  text-align: center;
  margin: 1em 0;
  font-size: 1.5rem;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.9rem;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 2.4rem;
  }
`;

const RegisterContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function RegisterPage() {
  if (userHelper.hasToken()) {
    return <Navigate to={routes.DASHBOARD_PATH} />;
  } else {
    return (
      <RegisterContainer>
        <Heading>Create your account</Heading>
        <Divider my="1em" width="10vw" color="var(--grey)" />
        <UserForm isNew={true} />
        <AlreadyUserSection />
        <Link
          to={routes.HOME_PATH}
          style={{
            textDecoration: "none",
            width: "10%",
            minWidth: "fit-content",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button backgroundColor="var(--secondary)">
            <Icon height="24px" width="24px" src={HomeIcon} />
            Home
          </Button>
        </Link>
      </RegisterContainer>
    );
  }
}
