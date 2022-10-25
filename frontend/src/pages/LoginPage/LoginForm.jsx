import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { CiUser, CiLock } from "react-icons/ci";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-height: 300px;
  height: 32vh;
  min-height: 230px;
`;

const FieldWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 50%;

  @media only screen and ${breakpoints.desktop} {
    max-width: 600px;
  }

  @media only screen and ${breakpoints.mobile} {
    width: unset;
    max-width: unset;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.6em auto 0 auto;
  width: 12vw;
  min-width: fit-content;
  max-width: 200px;
`;

export default function LoginForm() {
  return (
    <FormContainer>
      <FieldWrapper>
        <Input
          type="text"
          id="username-input"
          labelText="Username"
          placeholder="Username"
          icon={<CiUser color="#ffffff" size="24" />}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          type="password"
          id="password-input"
          labelText="Password"
          placeholder="Password"
          icon={<CiLock color="#ffffff" size="24" />}
        />
      </FieldWrapper>
      <ButtonWrapper>
        <Button type="submit">Log in</Button>
      </ButtonWrapper>
    </FormContainer>
  );
}