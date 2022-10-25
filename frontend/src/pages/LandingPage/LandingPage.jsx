import styled from "styled-components";
import Hero from "./Hero";

const LandingContainer = styled.main`
  display: flex;
  flex: 1;
`;

export default function LandingPage() {
  return (
    <LandingContainer>
      <Hero />
    </LandingContainer>
  );
}
