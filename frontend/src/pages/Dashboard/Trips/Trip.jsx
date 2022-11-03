import styled from "styled-components";
import Flag from "react-world-flags";
import lookup from "country-code-lookup";
import { Link } from "react-router-dom";
import routes from "../../../utils/providers/router/routes";

const FlagFallback = styled.div`
  display: inline-block;
  height: 16px;
  width: 26.66px;
  background-color: var(--grey);
`;

const TripContainer = styled.div`
  background-color: var(--primary);
  width: 100%;
  padding: 1em 3em;
  box-sizing: border-box;
  border-radius: 0.8em;
  margin-top: 1em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all ease 200ms;

  &:hover {
    border-color: var(--white);
  }
`;

const CountrySpan = styled.span`
  color: var(--white);
  font-weight: 600;
`;

const TimeParagraph = styled.p`
  color: var(--white);
`;

const DateSpan = styled.span`
  color: var(--grey);
  font-weight: 600;
`;

const LenghtParagraph = styled.p`
  color: var(--white);
`;

const Title = styled.h4`
  margin: 0;
  color: var(--white);
`;

const CreatedParagraph = styled.p`
  border-top: 1px solid var(--grey);
  padding-top: 8px;
  margin: 0;
  color: var(--grey);
`;

export default function Trip({
  country,
  startDate,
  endDate,
  created,
  title,
  daysLength,
  id,
}) {
  return (
    <TripContainer>
      <Link
        to={`${routes.TRIPS_PATH}/${id}`}
        style={{ textDecoration: "none" }}
      >
        <Title>
          <Flag
            code={lookup.byCountry(country)?.iso3}
            fallback={<FlagFallback></FlagFallback>}
            height="16"
            style={{
              marginRight: "8px",
              position: "relative",
              top: "3px",
            }}
          />
          {title}
        </Title>

        <LenghtParagraph>
          You spent there&nbsp;
          {daysLength.toLocaleString("es-US", {
            maximumFractionDigits: 2,
          })}
          &nbsp;days
        </LenghtParagraph>
        <CreatedParagraph>
          Created at {new Date(created).toLocaleDateString()}
        </CreatedParagraph>
      </Link>
    </TripContainer>
  );
}
