import styled from "styled-components";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import CountrySelect from "./CountrySelect";

import routes from "../../../utils/providers/router/routes";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/providers/auth/authContext";
import tripsAPI from "../../../utils/api/trips";
import { useEffect, useState } from "react";

const FormContainer = styled.form`
  display: flex;
  margin-top: 1.8em;
  flex-direction: column;
  gap: 1.2em;
`;

const FieldWrapper = styled.div`
  display: flex;
  gap: 1.2em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  margin: 1.8em auto;
`;

const Error = styled.div`
  text-align: center;
  padding: 1em 1.5em;
  border-radius: 0.5em;
  border: 2px solid rgba(200, 70, 70, 0.8);
  background-color: rgba(200, 70, 70, 0.2);
`;

export default function NewTripForm() {
  const [authState, _] = useContext(AuthContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    country: "",
    startDate: "",
    endDate: "",
  });

  const [start, setStart] = useState({
    date: "",
    time: "",
  });
  useEffect(() => {
    setTrip((prev) => {
      return {
        ...prev,
        startDate: `${start.date}T${start.time}`,
      };
    });
  }, [start]);

  const [end, setEnd] = useState({
    date: "",
    time: "",
  });
  useEffect(() => {
    setTrip((prev) => {
      return {
        ...prev,
        endDate: `${end.date}T${end.time}`,
      };
    });
  }, [end]);

  const [error, setError] = useState(false);
  function handleTripSubmit(e) {
    e.preventDefault();
    setError("");
    tripsAPI
      .createTrip(trip.country, trip.startDate, trip.endDate, authState.id)
      .then(() => navigate(routes.TRIPS_PATH))
      .catch(() => setError(true));
  }

  return (
    <FormContainer onSubmit={(e) => handleTripSubmit(e)}>
      {error && <Error>{"Trip end date can not exceed start date."}</Error>}
      <FieldWrapper>
        <CountrySelect
          value={trip.country}
          onChange={(country) =>
            setTrip((prev) => {
              return {
                ...prev,
                country,
              };
            })
          }
          labelText="Country"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          type="date"
          labelText="Started on"
          id="startDate-input"
          value={start.date}
          onChange={(e) =>
            setStart((prev) => {
              return {
                ...prev,
                date: e.target.value,
              };
            })
          }
          required
        />
        <Input
          type="time"
          labelText="Started at"
          id="startTime-input"
          value={start.time}
          onChange={(e) =>
            setStart((prev) => {
              return {
                ...prev,
                time: e.target.value,
              };
            })
          }
          required
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          type="date"
          labelText="Ended on"
          id="endDate-input"
          value={end.date}
          onChange={(e) =>
            setEnd((prev) => {
              return {
                ...prev,
                date: e.target.value,
              };
            })
          }
          required
        />
        <Input
          type="time"
          labelText="Ended at"
          id="endTime-input"
          value={end.time}
          onChange={(e) =>
            setEnd((prev) => {
              return {
                ...prev,
                time: e.target.value,
              };
            })
          }
          required
        />
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          backgroundColor="var(--accent)"
          color="var(--black)"
          hoverBackgroundColor="var(--accent)"
          type="submit"
        >
          Save a trip
        </Button>
      </ButtonWrapper>
    </FormContainer>
  );
}
