import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-right: auto;
  margin-bottom: 0.4em;
  font-size: 0.9em;

  @media only screen and ${breakpoints.laptop} {
    font-size: 1em;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.2em;
  }
`;

const StyledInput = styled.input`
  font-size: 1em;
  color: var(--white);
  background-color: var(--black) !important;
  border-radius: 20px;
  border: 1px solid transparent;
  padding: 0.5em 0.5em 0.5em 3em;
  flex-grow: 1;

  &:focus,
  &:focus-visible {
    color: var(--white);
    background-color: var(--black);
    outline: 3px solid var(--accent);
  }

  &::placeholder {
    font-family: inherit;
    font-size: 0.9em;
    font-style: italic;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 1.1em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.5em 0.5em 0.5em 2.5em;
    font-size: 1.3em;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledIcon = styled.i`
  position: absolute;
  margin-left: 12px;
  margin-top: 3px;

  @media only screen and ${breakpoints.laptop} {
    margin-left: 16px;
  }
`;

export default function Input({
  value,
  onChange,
  type,
  id,
  labelText,
  placeholder,
  icon,
  autoComplete,
  required,
  minLength,
}) {
  return (
    <InputContainer>
      <StyledLabel>{labelText}</StyledLabel>
      <InputWrapper>
        <StyledIcon>{icon}</StyledIcon>
        <StyledInput
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
      </InputWrapper>
    </InputContainer>
  );
}
