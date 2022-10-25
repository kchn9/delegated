import styled from "styled-components";
import breakpoints from "../../theme/breakpoints";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2em;

  @media only screen and ${breakpoints.tablet} {
    padding: 0 4em;
    display: grid;
  }

  @media only screen and ${breakpoints.laptop} {
    padding: 0 8em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0 15em;
  }
`;

const SidebarWrapper = styled.div`
  grid-column: 1 / span 4;
  padding: 2em 0;
`;
const ContentWrapper = styled.main`
  grid-column: 5 / span 8;
  padding: 2em 0;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </DashboardContainer>
  );
}
