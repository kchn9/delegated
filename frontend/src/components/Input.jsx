import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-left: 0.4em;
  margin-bottom: 0.4em;

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.2em;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 1em;
  }

  @media only screen and ${breakpoints.tablet} {
    font-size: 0.9em;
  }
`;

const StyledInput = styled.input`
  font-size: 1em;
  border-radius: 20px;
  border: 1px solid transparent;
  flex-grow: 1;

  &:focus,
  &:focus-visible {
    outline: 3px solid var(--accent);
  }

  &::placeholder {
    font-family: inherit;
    font-size: 0.9em;
    font-style: italic;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.5em 0.5em 0.5em 2.5em;
    font-size: 1.3em;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0.5em 0.5em 0.5em 3em;
    font-size: 1.1em;
  }

  @media only screen and ${breakpoints.tablet} {
    font-size: 1em;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const StyledIcon = styled.i`
  position: absolute;

  @media only screen and ${breakpoints.desktop} {
    margin-left: 20px;
    bottom: 6px;
  }

  @media only screen and ${breakpoints.laptop} {
    margin-left: 16px;
    top: 6px;
  }

  @media only screen and ${breakpoints.mobile} {
    margin-left: 12px;
    bottom: 0;
  }
`;

export default function Input({ type, id, labelText, placeholder, icon }) {
  return (
    <InputContainer>
      <StyledLabel>{labelText}</StyledLabel>
      <InputWrapper>
        <StyledIcon>{icon}</StyledIcon>
        <StyledInput type={type} id={id} placeholder={placeholder} />
      </InputWrapper>
    </InputContainer>
  );
}
