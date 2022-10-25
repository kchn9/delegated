import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Header from "../../components/Header";
import Hero from "./Hero";

const LandingContainer = styled.main`
  display: flex;
  flex: 1;
`;

export default function LandingPage() {
  return (
    <>
      <Header />
      <LandingContainer>
        <Hero />
      </LandingContainer>
    </>
  );
}
