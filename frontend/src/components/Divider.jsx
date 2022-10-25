import styled from "styled-components";

const StyledDivider = styled.div`
  width: ${(props) => (props.width ? props.width : "100px")};
  border-bottom: solid 5px
    ${(props) => (props.color ? props.color : "var(--gray)")};
  margin: ${(props) => (props.my ? props.my : "1.2em")} auto;
`;

export default function Divider({ width, color, my }) {
  return <StyledDivider my={my} width={width} color={color} />;
}
