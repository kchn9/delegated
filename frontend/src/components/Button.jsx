import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const StyledButton = styled.button`
  border-radius: 0.5em;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-family: inherit;
  font-weight: 500;
  color: ${(props) => props.color || "var(--white)"};
  background-color: ${(props) => props.backgroundColor || "var(--primary)"};
  cursor: pointer;
  transition: background-color 100ms;
  padding: 0.6em 1.2em;
  font-size: 0.8em;

  &:hover {
    background-color: ${(props) =>
      props.hoverBackgroundColor || "var(--secondary)"};
  }

  &:focus,
  &:focus-visible {
    outline: 2px solid var(--accent);
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0.7em 1.3em;
    font-size: 0.9em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.7em 1.8em;
    font-size: 1.1em;
  }
`;

export default function Button({
  color,
  backgroundColor,
  hoverBackgroundColor,
  children,
}) {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
    >
      {children}
    </StyledButton>
  );
}
