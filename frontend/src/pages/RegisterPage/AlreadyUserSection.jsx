import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import routes from "../../utils/providers/router/routes";
import { Link } from "react-router-dom";

const SectionWrapper = styled.section`
  margin: 2em 0 3em 0;
`;

const SubHeading = styled.h2`
  text-align: center;
  margin: 1em 0;
  font-size: 1.2rem;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.4rem;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.6rem;
  }
`;

const StyledText = styled.p`
  text-align: center;
  margin: 0.6em 2em;
  font-size: 1rem;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.2rem;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.4rem;
  }
`;

const Highlighted = styled.mark`
  background-color: var(--accent);
  border: 1px solid transparent;
  padding: 0.25em 0.4em;
  border-radius: 1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border ease-in 200ms;

  &:hover {
    border: 1px solid var(--primary);
  }
`;

export default function AlreadyUserSection() {
  return (
    <SectionWrapper>
      <SubHeading>Are you a user already?</SubHeading>
      <StyledText>
        Log in&nbsp;
        <Link style={{ textDecoration: "none" }} to={routes.LOGIN_PATH}>
          <Highlighted>here</Highlighted>
        </Link>
      </StyledText>
    </SectionWrapper>
  );
}
