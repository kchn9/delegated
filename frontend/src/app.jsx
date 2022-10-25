import styled from "styled-components";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import Footer from "./components/Footer";

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <LoginPage />
      <Footer />
    </AppWrapper>
  );
}
