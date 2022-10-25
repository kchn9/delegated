import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Divider from "../../components/Divider";
import LoginForm from "./LoginForm";
import NotRegisteredSection from "./NotRegisteredSection";

const Heading = styled.h1`
  text-align: center;
  margin: 1em 0;

  @media only screen and ${breakpoints.desktop} {
    font-size: 2.4rem;
  }

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.9rem;
  }

  @media only screen and ${breakpoints.mobile} {
    font-size: 1.5rem;
  }
`;

const LoginContainer = styled.main`
  flex: 1;
`;

export default function LoginPage() {
  return (
    <LoginContainer>
      <Heading>Log in to your account</Heading>
      <Divider my="1em" width="10vw" color="var(--grey)" />
      <LoginForm />
      <NotRegisteredSection />
    </LoginContainer>
  );
}
