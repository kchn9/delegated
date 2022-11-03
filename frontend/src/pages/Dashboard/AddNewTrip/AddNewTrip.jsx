import styled from "styled-components";

import SubTitle from "../../../components/SubTitle";
import NewTripFrom from "./NewTripForm";

const NewTripContainer = styled.section``;

export default function AddNewTrip() {
  return (
    <NewTripContainer>
      <SubTitle>Adding new trip</SubTitle>
      <NewTripFrom />
    </NewTripContainer>
  );
}
