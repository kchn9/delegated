import styled from "styled-components";
import routes from "../../utils/providers/router/routes";
import breakpoints from "../../theme/breakpoints";

import { Link } from "react-router-dom";
import Button from "../../components/Button";

import pictureSrc from "../../assets/amanda-bartel-banner.webp";

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url(${pictureSrc}) center center no-repeat;
  background-size: 200% auto;

  animation: map 30s ease-in-out infinite;

  @keyframes map {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  width: 100%;
  padding: 0 1.5em;

  @media only screen and ${breakpoints.tablet} {
    background-size: 110% auto;

    padding: 0 4em;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0.1em 8em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.2em 15em;
  }
`;

const Banner = styled.hgroup`
  margin: 0;
  width: 100%;
  padding: 1em 1.5em;
  background-color: rgba(255, 255, 255, 0.86);

  @media only screen and ${breakpoints.tablet} {
    box-sizing: border-box;

    padding: 3vw 20%;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1.3rem;
  text-align: center;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.8em;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 2.1rem;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 2.3rem;
  }
`;

const SubHeading = styled.h2`
  margin: 0.6vw 0 1vw 0;
  color: var(--gray);
  font-size: 1.1rem;
  text-align: center;

  @media only screen and ${breakpoints.tablet} {
    font-size: 1.6rem;
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 1.5rem;
  }

  @media only screen and ${breakpoints.desktop} {
    font-size: 1.8rem;
  }
`;

export default function Hero() {
  return (
    <HeroContainer>
      <Banner>
        <Heading>Track your buisness trips</Heading>
        <SubHeading>Join today, here</SubHeading>
        <Link
          to={routes.REGISTER_PATH}
          style={{
            margin: "0 auto",
            display: "flex",
            textDecoration: "none",
            flexDirection: "column",
            width: "33%",
          }}
        >
          <Button
            color="var(--white)"
            backgroundColor="var(--secondary)"
            hoverBackgroundColor="var(--primary)"
          >
            Join
          </Button>
        </Link>
      </Banner>
    </HeroContainer>
  );
}
