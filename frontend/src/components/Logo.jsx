import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const StyledLogo = styled.img`
  padding: 0.2em;

  @media only screen and ${breakpoints.desktop} {
    height: 90px;
    width: 210px;
  }

  @media only screen and ${breakpoints.laptop} {
    height: 70px;
    width: 163px;
  }

  @media only screen and ${breakpoints.mobile} {
    height: 50px;
    width: 116px;
  }
`;

export default function Logo({ src, height, width }) {
  return <StyledLogo src={src} height={height} width={width} />;
}