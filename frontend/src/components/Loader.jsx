import styled from "styled-components";

const StyledLoader = styled.div`
  border-radius: 50%;
  border: 7px solid var(--grey);
  border-top: 7px solid ${(props) => props.color || "black"};
  animation: spin 2000ms infinite;
  height: ${(props) => props.height || "42px"};
  width: ${(props) => props.width || "42px"};
  margin: 3em auto;

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader({ height, width, color }) {
  return <StyledLoader height={height} width={width} color={color} />;
}
