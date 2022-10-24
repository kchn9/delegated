import styled from "styled-components";
import breakpoints from "../theme/breakpoints";
import Logo from "./Logo";
import Button from "./Button";
import LogoSrc from "../assets/delegated-logo.png";

const HeaderWrapper = styled.header`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and ${breakpoints.desktop} {
    margin: 0.2em auto 0 auto;
    padding: 0.2em 15em;
  }

  @media only screen and ${breakpoints.laptop} {
    margin: 0.1em auto 0 auto;
    padding: 0.1em 8em;
  }

  @media only screen and ${breakpoints.tablet} {
    padding: 0 4em;
  }

  @media only screen and ${breakpoints.mobile} {
    padding: 0 1.5em;
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
