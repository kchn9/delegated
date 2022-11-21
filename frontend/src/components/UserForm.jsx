import usersAPI from "../utils/api/users";
import sessionsAPI from "../utils/api/sessions";

import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

import { useContext, useState } from "react";
import { setAuthToken } from "../utils/providers/axios/axiosHelper.js";
import jwt_decode from "jwt-decode";

import routes from "../utils/providers/router/routes";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Input from "./Input";
import Icon from "./Icon";

import { CiUser, CiLock } from "react-icons/ci";
import LoginIcon from "../assets/icons/login.svg";
import { AuthContext } from "../utils/providers/auth/authContext";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-height: 300px;
  height: 32vh;
  min-height: 230px;
  margin-top: 2em;
  gap: 8px;
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

const ErrorContainer = styled.div`
  text-align: center;
  color: var(--primary);
  font-size: clamp(12px, 1vw, 16px);
  border: 2px solid rgba(200, 70, 70, 0.8);
  background-color: rgba(200, 70, 70, 0.2);
  box-sizing: border-box;
  padding: 0.5em 1.2em;
  margin: 0 auto 1em auto;
  border-radius: 0.5em;
  width: 80%;
  max-width: 500px;
  min-width: 240px;

  @media screen only and ${breakpoints.tablet} {
    padding: 0.8em 1.4em;
    width: 50%;
  }
`;

export default function UserForm({ isNew }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useContext(AuthContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function saveToken(token) {
    if (!token) {
      return;
    }
    setAuthToken(token);
    localStorage.setItem("jwt", JSON.stringify(token));
    const decodedToken = jwt_decode(token);
    setAuthState({
      id: decodedToken.id,
      username: decodedToken.username,
    });
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");

    usersAPI
      .createUser(user.username, user.password)
      .then(() => {
        setUser({
          username: "",
          password: "",
        });
        return sessionsAPI.login(user.username, user.password);
      })
      .then((token) => {
        saveToken(token);
        navigate(routes.DASHBOARD_PATH);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    sessionsAPI
      .login(user.username, user.password)
      .then((token) => {
        setUser({
          username: "",
          password: "",
        });
        saveToken(token);
        navigate(routes.DASHBOARD_PATH);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <FormContainer
      onSubmit={isNew ? (e) => handleRegister(e) : (e) => handleLogin(e)}
    >
      {error && <ErrorContainer>{error}</ErrorContainer>}

      <FieldWrapper>
        <Input
          type="text"
          id="username-input"
          labelText="Username"
          placeholder="Username"
          icon={<CiUser color="#ffffff" size="24" />}
          value={user.username}
          autoComplete="username"
          required
          minLength={6}
          onChange={(e) =>
            setUser((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            })
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          type="password"
          id="password-input"
          labelText="Password"
          placeholder="Password"
          autoComplete="current-password"
          icon={<CiLock color="#ffffff" size="24" />}
          value={user.password}
          required
          minLength={8}
          onChange={(e) =>
            setUser((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            })
          }
        />
      </FieldWrapper>

      <ButtonWrapper>
        <Button type="submit">
          {!isNew && <Icon height="20px" width="24px" src={LoginIcon} />}
          {isNew ? "Create an account" : "Log in"}
        </Button>
      </ButtonWrapper>
    </FormContainer>
  );
}
