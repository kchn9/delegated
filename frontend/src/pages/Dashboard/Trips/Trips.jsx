import styled from "styled-components";
import breakpoints from "../../../theme/breakpoints";

import { Virtuoso } from "react-virtuoso";
import Loader from "../../../components/Loader";
import SubTitle from "../../../components/SubTitle";

import Trip from "./Trip";

import { AuthContext } from "../../../utils/providers/auth/authContext";
import usersAPI from "../../../utils/api/users.js";
import { useContext, useEffect, useState } from "react";

const TripsWrapper = styled.div`
  padding: 1.2em 0;
  @media only screen and ${breakpoints.tablet} {
    margin-top: 1.5em;
  }
`;

const FallbackText = styled.p`
  text-align: center;
  color: var(--gray);
`;

export default function Trips() {
  const [authState, _] = useContext(AuthContext);
  const [trips, setTrips] = useState(() => []);
  const [loading, setLoading] = useState(false);

  function fetchTrips() {
    if (authState && authState.id) {
      setLoading(true);
      usersAPI
        .getUserInfo(authState.id)
        .then((user) => {
          let { trips } = user;
          setTrips(trips);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    fetchTrips();
  }, [authState]);

  return (
    <>
      <SubTitle>Your trips</SubTitle>
      {!loading && trips && trips.length === 0 && (
        <FallbackText>No trips to show. Feel free to add one.</FallbackText>
      )}
      {loading && <Loader height="32px" width="32px" />}

      <TripsWrapper>
        {trips && trips.length > 0 && (
          <Virtuoso
            style={{ height: "75vh" }}
            data={trips}
            itemContent={(index, trip) => {
              return <Trip key={index} {...trip}></Trip>;
            }}
            components={{
              Footer: () => {
                if (trips.length > 4) {
                  return (
                    <FallbackText>End of your trips list. Cheers.</FallbackText>
                  );
                }
              },
            }}
          />
        )}
      </TripsWrapper>
    </>
  );
}
