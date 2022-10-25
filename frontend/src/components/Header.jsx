import styled from "styled-components";
import breakpoints from "../theme/breakpoints";
import Logo from "./Logo";
import Button from "./Button";
import LogoSrc from "../assets/delegated-logo.png";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;

  @media only screen and ${breakpoints.tablet} {
    padding: 0 4em;
  }

  @media only screen and ${breakpoints.laptop} {
    margin: 0.1em 0;
    padding: 0.1em 8em;
  }

  @media only screen and ${breakpoints.desktop} {
    margin: 0.2em 0;
    padding: 0.2em 15em;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo src={LogoSrc} height="60px" width="140px" />
      <Button>Sign in</Button>
    </HeaderWrapper>
  );
}
