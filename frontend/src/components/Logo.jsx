import styled from "styled-components";
import breakpoints from "../theme/breakpoints";

const StyledLogo = styled.img`
  padding: 0.2em;
  height: 50px;
  width: 116px;

  @media only screen and ${breakpoints.laptop} {
    height: 70px;
    width: 163px;
  }

  @media only screen and ${breakpoints.desktop} {
    height: 90px;
    width: 210px;
  }
`;

export default function Logo({ src, height, width }) {
  return <StyledLogo src={src} alt="Logo" height={height} width={width} />;
}
