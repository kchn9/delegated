import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";

const SectionWrapper = styled.section`
  margin: 2em 0 3em 0;
`;

const SubHeading = styled.h2`
  text-align: center;
  margin: 1em 0;

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.6rem;
  }

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.4rem;
  }

  @media only screen and ${breakpoints.mobile} {
    font-size: 1.2rem;
  }
`;

const StyledText = styled.p`
  text-align: center;
  margin: 0.6em 2em;
  font-size: 1.2em;

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.4rem;
  }

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.2rem;
  }

  @media only screen and ${breakpoints.mobile} {
    font-size: 1rem;
  }
`;

const Highlighted = styled.mark`
  background-color: var(--accent);
  padding: 0.25em 0.4em;
  border-radius: 1em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    outline: 1px solid var(--primary);
  }
`;

export default function NotRegisteredSection() {
  return (
    <SectionWrapper>
      <SubHeading>Not registered yet?</SubHeading>
      <StyledText>
        Feel free to sign up <Highlighted>here</Highlighted>
      </StyledText>
    </SectionWrapper>
  );
}