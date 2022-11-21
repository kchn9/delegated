import styled from "styled-components";
import SubTitle from "../../../components/SubTitle";
import { useContext, useEffect, useState } from "react";
import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import map from "../../../utils/map.json";
import { getPosFromCountry } from "../../../utils/countryPos";
import { AuthContext } from "../../../utils/providers/auth/authContext";
import usersAPI from "../../../utils/api/users.js";

const MapContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledMap = styled(ComposableMap)`
  width: 100%;
  margin: 1em auto;
`;

const StyledGeography = styled(Geography)`
  fill: var(--primary);
  stroke: var(--white);

  &:focus {
    outline: none;
  }

  &:hover {
    fill: var(--accent);
  }
`;

export default function Map() {
  const [authState, _] = useContext(AuthContext);
  const [trips, setTrips] = useState(() => []);

  function fetchTrips() {
    if (authState && authState.id) {
      usersAPI
        .getUserInfo(authState.id)
        .then((user) => {
          let { trips } = user;
          setTrips(trips);
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    fetchTrips();
  }, [authState]);

  return (
    <MapContainer>
      <SubTitle>Browse your trips on map</SubTitle>
      <StyledMap>
        <Geographies geography={map}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <StyledGeography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {trips &&
          trips.length > 0 &&
          trips.map((trip) => (
            <Marker coordinates={getPosFromCountry(trip.country)}>
              <circle r={4} fill={"var(--accent)"} />
            </Marker>
          ))}
      </StyledMap>
    </MapContainer>
  );
}
