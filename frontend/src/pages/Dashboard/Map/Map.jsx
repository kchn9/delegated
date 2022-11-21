import styled from "styled-components";
import SubTitle from "../../../components/SubTitle";
import { useContext, useMemo, useEffect, useState } from "react";
import {
  Graticule,
  Line,
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
  const sortedTrips = useMemo(() => {
    return [...trips].sort(function (a, b) {
      return new Date(a.created) - new Date(b.created);
    });
  }, [trips]);

  return (
    <MapContainer>
      <SubTitle>Browse your trips on map</SubTitle>
      <StyledMap>
        <Graticule stroke={"var(--l-grey)"} />
        <Geographies geography={map}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <StyledGeography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {sortedTrips &&
          sortedTrips.length > 1 &&
          sortedTrips.map((trip, index, array) => {
            const intensity = Math.round((0.4 + Math.random() * 0.5) * 100, 1);
            console.log(trip.country);
            if (array.length > index + 1)
              return (
                <Line
                  key={index}
                  from={getPosFromCountry(trip.country)}
                  to={getPosFromCountry(array[index + 1].country)}
                  stroke={`hsl(37.8deg, 100%, ${intensity}%)`}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              );
          })}
      </StyledMap>
    </MapContainer>
  );
}
