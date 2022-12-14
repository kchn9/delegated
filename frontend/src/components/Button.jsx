import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-family: inherit;
  font-weight: 500;
  color: ${(props) => props.color || "var(--white)"};
  background-color: ${(props) => props.backgroundColor || "var(--primary)"};
  border: ${(props) =>
    props.outlineColor ? `${props.outlineColor} solid 2px` : "none"};
  cursor: pointer;
  transition: background-color 300ms;
  padding: 0.6em 1.2em;
  font-size: clamp(12px, 1.1vw, 18px);

  &:hover {
    color: ${(props) => props.hoverColor || props.color || "var(--white)"};

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
  outlineColor,
  color,
  backgroundColor,
  hoverBackgroundColor,
  hoverColor,
  children,
  onClick,
  type,
}) {
  return (
    <StyledButton
      outlineColor={outlineColor}
      color={color}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverColor={hoverColor}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
}
