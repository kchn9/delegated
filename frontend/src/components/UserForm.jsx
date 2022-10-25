import styled from "styled-components";
import breakpoints from "../theme/breakpoints";
import Button from "./Button";
import Input from "./Input";
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
  max-width: 500px;
  min-width: 240px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.6em auto 0 auto;
  width: 12vw;
  min-width: fit-content;
  max-width: 200px;
`;

export default function UserForm({ isNew }) {
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
        <Button type="submit">{isNew ? "Create an account" : "Log in"}</Button>
      </ButtonWrapper>
    </FormContainer>
  );
}
