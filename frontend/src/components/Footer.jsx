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

const StyledAnchor = styled.a`
  text-decoration: none;
  color: var(--primary);
`;

export default function Footer() {
  return (
    <FooterContainer>
      Created with ❤️ by
      <StyledAnchor href="http://github.com/kchn9/delegated">
        &nbsp;kchn9&nbsp;
      </StyledAnchor>
      ©
    </FooterContainer>
  );
}
