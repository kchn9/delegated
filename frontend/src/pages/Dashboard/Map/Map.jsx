import styled from "styled-components";

import SubTitle from "../../../components/SubTitle";

const MapContainer = styled.section`
  text-align: center;
`;

export default function Map() {
  return (
    <MapContainer>
      <SubTitle>Browse your trips on map</SubTitle>
    </MapContainer>
  );
}
