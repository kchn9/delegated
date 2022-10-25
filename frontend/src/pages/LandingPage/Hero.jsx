import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import { Link } from "react-router-dom";
import routes from "../../utils/providers/router/routes";
import Button from "../../components/Button";
import Picture from "../../components/Picture";
import pictureSrc from "../../assets/amanda-bartel-banner.webp";

const HeroContainer = styled.section`
  display: flex;
  width: 100%;
  grid-template-columns: repeat(12, 1fr);
  gap: 1em;
  align-items: center;
  justify-content: center;

  @media only screen and ${breakpoints.tablet} {
    padding: 2em calc(4em + 20px);
    display: grid;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 2em calc(8em + 20px);
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 2em calc(15em + 20px);
  }
`;

const Group = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.91);
  padding: 0.4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1em;

  @media only screen and (min-width: 390px) {
    border-radius: 1em;
  }

  @media only screen and ${breakpoints.tablet} {
    position: unset;
    background-color: unset;
    border: unset;
    grid-column: 1 / span 6;
  }
`;

const PictureWrapper = styled.div`
  grid-column: 7 / span 6;
  width: 100%;
  height: 100%;
  max-height: 80vh;

  @media only screen and ${breakpoints.tablet} {
    border: 10px solid var(--accent);
  }
`;

const Heading = styled.h1`
  margin: 0.1em 1em;
  text-align: center;
  font-size: 1.6em;

  @media only screen and ${breakpoints.tablet} {
    font-size: 2em;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 2.4em;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 2.7em;
  }
`;

const SubHeading = styled.h2`
  margin: 0.1em 1em;
  text-align: center;
  color: var(--gray);
  font-size: 1.2em;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.5em;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 2em;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 2.3em;
  }
`;

export default function Hero() {
  return (
    <HeroContainer>
      <Group>
        <Heading>Track your business trips</Heading>
        <SubHeading>Don't lose control of your delegations</SubHeading>
        <Link
          style={{
            margin: "1em 0",
            display: "flex",
            flexDirection: "column",
            width: "33%",
            textDecoration: "none",
          }}
          to={routes.REGISTER_PATH}
        >
          <Button
            color="var(--secondary)"
            hoverBackgroundColor="var(--primary)"
            backgroundColor="var(--accent)"
          >
            Join now
          </Button>
        </Link>
      </Group>
      <PictureWrapper>
        <Picture
          src={pictureSrc}
          alt="Travel attributes such as passport and camera against the backdrop of the globe"
          height="1438"
          width="960"
        />
      </PictureWrapper>
    </HeroContainer>
  );
}
