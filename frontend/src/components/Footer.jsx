import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em;
  font-size: 0.8em;
  color: var(--accent);
  background-color: var(--secondary);
  letter-spacing: 0.1em;
`;

export default function Footer() {
  return <FooterContainer>Created with ❤️ by kchn9 ©</FooterContainer>;
}
