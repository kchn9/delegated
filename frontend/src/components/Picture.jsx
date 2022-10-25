import styled from "styled-components";

const StyledPicture = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export default function Picture({ src, alt, height, width }) {
  return <StyledPicture src={src} alt={alt} height={height} width={width} />;
}
