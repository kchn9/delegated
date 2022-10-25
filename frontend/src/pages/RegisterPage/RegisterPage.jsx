import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Divider from "../../components/Divider";
import UserForm from "../../components/UserForm";
import AlreadyUserSection from "./AlreadyUserSection";

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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function RegisterPage() {
  return (
    <RegisterContainer>
      <Heading>Create your account</Heading>
      <Divider my="1em" width="10vw" color="var(--grey)" />
      <UserForm isNew={true} />
      <AlreadyUserSection />
    </RegisterContainer>
  );
}
