import styled from "styled-components";

import lookup from "country-code-lookup";
import daysFormatter from "../../../utils/daysFormatter";
import routes from "../../../utils/providers/router/routes";

import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Flag from "react-world-flags";

import CalendarIcon from "../../../assets/icons/calendar-date.svg";
import TimeIcon from "../../../assets/icons/time.svg";
import LocationIcon from "../../../assets/icons/location.svg";
import BackIcon from "../../../assets/icons/arrow-left.svg";

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;
  font-size: clamp(16px, 1.6vw, 26px);
  margin: 0 0 1.25em 0;
  padding: 0 3em;
  color: var(--black);

  &::first-letter {
    font-weight: 800;
    font-size: clamp(18px, 1.8vw, 30px);
  }
`;

const SubTitle = styled.h4`
  font-size: clamp(16px, 1.5vw, 24px);
  margin: 1.2em 0 0.6em 0;
  color: var(--primary);
`;

const LocationParagraph = styled.h5`
  display: flex;
  margin: 0;
  padding: 1.5em 2em;
  border-radius: 0.5em;
  font-size: clamp(12px, 1.2vw, 16px);
  background-color: var(--l-grey);
  font-weight: 600;
  align-items: center;
`;

const FlexParagraph = styled.p`
  display: flex;
  align-items: center;
  margin: 0.4em 0;
  font-weight: 600;
`;

const HightlightSpan = styled.span`
  background-color: var(--primary);
  color: var(--white);
  padding: 0.6ch 1ch;
  border-radius: 1ch;
`;

const LengthSpan = styled.span`
  background-color: var(--accent);
  color: var(--secondary);
  margin: 0 0.5ch;
  padding: 0.6ch 1ch;
  border-radius: 1ch;
`;

const LenghtParagraph = styled.p`
  color: var(--black);
  font-weight: 600;
`;

const FlagFallback = styled.div`
  display: inline-block;
  height: 16px;
  width: 26.66px;
  background-color: var(--gray);
`;

const CreatedParagraph = styled.p`
  border-top: 1px solid var(--grey);
  margin: 0;
  padding-top: 0.4em;
  margin-top: 1.9em;
  color: var(--gray);
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: var(--l-grey);
  border-radius: 0.5em;
`;

export default function TripView() {
  const response = {
    daysLength: 29.97777222,
  };

  return (
    <ViewContainer>
      <Title>{response.title}</Title>
      <SubTitle>Details:</SubTitle>
      <LocationParagraph>
        <Icon src={LocationIcon} height="24px" width="24px" />
        Where? &nbsp;
        <HightlightSpan>
          <Flag
            code={lookup.byCountry(response.country)?.iso3}
            fallback={<FlagFallback></FlagFallback>}
            height="16"
            style={{
              marginRight: "8px",
              position: "relative",
              top: "3px",
            }}
          />
          {response.country}
        </HightlightSpan>
      </LocationParagraph>
      <SubTitle>Trip:</SubTitle>
      <DatesContainer>
        <DateWrapper>
          <FlexParagraph>
            <Icon src={CalendarIcon} height="24px" width="24px" />
            Started on&nbsp;
            <HightlightSpan>
              {new Date(response.startDate).toLocaleDateString()}
            </HightlightSpan>
          </FlexParagraph>
          <FlexParagraph>
            <Icon src={TimeIcon} height="24px" width="24px" />
            at&nbsp;
            <HightlightSpan>
              {new Date(response.startDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </HightlightSpan>
          </FlexParagraph>
        </DateWrapper>

        <LenghtParagraph>
          <LengthSpan>
            {daysFormatter.formatDaysLength(response.daysLength)}
          </LengthSpan>
        </LenghtParagraph>

        <DateWrapper>
          <FlexParagraph>
            <Icon src={CalendarIcon} height="24px" width="24px" />
            Finished on&nbsp;
            <HightlightSpan>
              {new Date(response.endDate).toLocaleDateString()}
            </HightlightSpan>
          </FlexParagraph>
          <FlexParagraph>
            <Icon src={TimeIcon} height="24px" width="24px" />
            at&nbsp;
            <HightlightSpan>
              {new Date(response.endDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </HightlightSpan>
          </FlexParagraph>
        </DateWrapper>
      </DatesContainer>
      <SubTitle>Per diem:</SubTitle>
      coming soon
      <SubTitle>Expences:</SubTitle>
      coming soon
      <Link
        to={routes.DASHBOARD_PATH}
        style={{
          marginTop: "2em",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          width: "20%",
          justifyContent: "center",
        }}
      >
        <Button>
          <Icon src={BackIcon} height="24px" width="24px" color="white" />
          Back
        </Button>
      </Link>
      <CreatedParagraph>
        Created on {new Date(response.created).toLocaleDateString()}
      </CreatedParagraph>
    </ViewContainer>
  );
}
