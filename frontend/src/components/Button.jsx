import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const StyledButton = styled.button`
  border-radius: 0.5em;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-family: inherit;
  font-weight: 500;
  background-color: var(--primary);
  cursor: pointer;
  transition: background-color 100ms;

  &:hover {
    background-color: var(--secondary);
  }

  &:focus,
  &:focus-visible {
    outline: 2px solid var(--accent);
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.8em 2em;
    font-size: 1.2em;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0.7em 1.3em;
    font-size: 0.9em;
  }

  @media only screen and ${breakpoints.mobile} {
    padding: 0.6em 1.2em;
    font-size: 0.8em;
  }
`;

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
