import styled from "styled-components";
import Breadcrumb from "../../../components/Breadcrumb";
import Trip from "./Trip";

const TripsContainer = styled.section``;
const TripsWrapper = styled.div`
  margin-top: 1.6em;
  padding: 1.2em 0;
`;

export default function Trips() {
  const trips = [
    {
      country: "Germany",
      startDate: "2022-10-21T08:52:00.000Z",
      endDate: "2022-11-20T08:12:00.000Z",
      created: "2022-10-23T10:19:51.408Z",
      user: "6354e94292d057c769a3248d",
      title: "Germany from 21.10.2022 to 20.11.2022",
      daysLength: 29.97222222222222,
      id: "63551558e78953fbb22f68c9",
    },
    {
      country: "Poland",
      startDate: "2022-10-21T08:52:00.000Z",
      endDate: "2022-11-20T08:12:00.000Z",
      created: "2022-10-23T10:19:51.408Z",
      user: "6354e94292d057c769a3248d",
      title: "Poland from 21.10.2022 to 20.11.2022",
      daysLength: 29.97222222222222,
      id: "63551558e78953fbb22f68c1",
    },
  ];
  return (
    <TripsContainer>
      <Breadcrumb>Your trips</Breadcrumb>
      <TripsWrapper>
        {trips.map((trip) => (
          <Trip key={trip.id} {...trip}></Trip>
        ))}
      </TripsWrapper>
    </TripsContainer>
  );
}
