import styled from "styled-components";
import breakpoints from "../../../theme/breakpoints";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import routes from "../../../utils/providers/router/routes";
import daysFormatter from "../../../utils/daysFormatter";
import { iso2 } from "../../../utils/countries";

const FlagFallback = styled.div`
  display: inline-block;
  height: 16px;
  width: 26.66px;
  background-color: var(--grey);
`;

const TripContainer = styled.div`
  margin: 1em 1.5em 0 1.5em;
  padding: 0.8em 1.4em;
  border: 2px solid transparent;
  border-radius: 0.4em;
  background-color: var(--primary);
  box-sizing: border-box;
  transition: all ease 200ms;
  cursor: pointer;

  &:hover {
    border-color: var(--white);
  }

  @media only screen and ${breakpoints.tablet} {
    padding: 1em 3em;
    margin: 1.2em 0 0 0;
  }
`;

const LenghtParagraph = styled.p`
  color: var(--white);
  margin: 0.6em 0;
  font-size: 14px;

  @media only screen and ${breakpoints.desktop} {
    font-size: 16px;
  }
`;

const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: var(--white);
  font-size: 15px;

  @media only screen and ${breakpoints.desktop} {
    font-size: 17px;
  }
`;

const CreatedParagraph = styled.p`
  border-top: 1px solid var(--grey);
  padding-top: 8px;
  margin: 0;
  color: var(--grey);
  font-size: 13px;
  @media only screen and ${breakpoints.desktop} {
    font-size: 15px;
  }
`;

export default function Trip({ country, created, title, daysLength, id }) {
  return (
    <TripContainer>
      <Link
        to={`${routes.TRIPS_PATH}/${id}`}
        style={{ textDecoration: "none" }}
      >
        <Title>
          <Flag
            code={iso2(country)}
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
          {daysFormatter.formatDaysLength(daysLength)}
        </LenghtParagraph>
        <CreatedParagraph>
          Created on {new Date(created).toLocaleDateString()}
        </CreatedParagraph>
      </Link>
    </TripContainer>
  );
}
