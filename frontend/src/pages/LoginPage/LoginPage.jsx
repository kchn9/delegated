import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Divider from "../../components/Divider";
import UserForm from "../../components/UserForm";
import NotRegisteredSection from "./NotRegisteredSection";

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

const LoginContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function LoginPage() {
  return (
    <LoginContainer>
      <Heading>Log in to your account</Heading>
      <Divider my="1em" width="10vw" color="var(--grey)" />
      <UserForm isNew={false} />
      <NotRegisteredSection />
    </LoginContainer>
  );
}
