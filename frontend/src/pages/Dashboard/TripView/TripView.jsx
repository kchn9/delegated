import styled from "styled-components";
import breakpoints from "../../../theme/breakpoints";
import Icon from "../../../components/Icon";
import Flag from "react-world-flags";

import LocationIcon from "../../../assets/icons/location.svg";
import CalendarIcon from "../../../assets/icons/calendar-date.svg";
import TimeIcon from "../../../assets/icons/time.svg";
import PerDiemIcon from "../../../assets/icons/per-diem.svg";

import daysFormatter from "../../../utils/daysFormatter";
import { iso2 } from "../../../utils/countries";
import { getDiemRate } from "../../../utils/diemRates";

import { useLoaderData } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.5em;
`;

const Title = styled.h3`
  text-align: center;
  font-size: clamp(16px, 1.6vw, 26px);
  color: var(--black);

  &::first-letter {
    font-weight: 800;
    font-size: clamp(18px, 1.8vw, 30px);
  }
`;

const Section = styled.section`
  background-color: var(--l-grey);
  font-size: clamp(12px, 1.2vw, 16px);

  padding: 0.8em 1.2em;
  margin: 0.9em 0;
`;

const SubTitle = styled.h4`
  font-size: clamp(16px, 1.5vw, 24px);
  margin: 1.2em 0 0.6em 0;
  color: var(--primary);
  margin: 0;
  margin-bottom: 0.6em;
`;

const FlagFallback = styled.div`
  display: inline-block;
  height: 16px;
  width: 26.66px;
  background-color: var(--gray);
`;

const HighlightText = styled.span`
  background-color: var(--primary);
  color: var(--white);
  font-weight: 600;
  padding: 0.75ch 1ch;
  border-radius: 0.5em;
  margin-left: 2ch;
`;

const StyledParagraph = styled.p`
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function IconParagraph(props) {
  return (
    <StyledParagraph>
      <Icon src={props.src} height="24px" width="24px" />
      {props.children}
    </StyledParagraph>
  );
}

const FlexFill = styled.div`
  flex: 1;
`;

export default function TripView() {
  const trip = useLoaderData();
  return (
    <Container>
      <Title>{trip?.title}</Title>

      <Section>
        <SubTitle>Details:</SubTitle>

        <IconParagraph src={LocationIcon}>
          Destination: &nbsp;
          <FlexFill />
          <HighlightText>
            <Flag
              code={iso2(trip?.country)}
              fallback={<FlagFallback></FlagFallback>}
              height="16"
              style={{
                marginRight: "8px",
                position: "relative",
                top: "3px",
              }}
            />
            {trip.country}
          </HighlightText>
        </IconParagraph>

        <IconParagraph src={CalendarIcon}>
          Beginning on: &nbsp;
          <FlexFill />
          <HighlightText>
            {new Date(trip?.startDate).toLocaleDateString()}
          </HighlightText>
        </IconParagraph>
        <IconParagraph src={TimeIcon}>
          Beginning at: &nbsp;
          <FlexFill />
          <HighlightText>
            {new Date(trip?.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </HighlightText>
        </IconParagraph>
        <IconParagraph src={CalendarIcon}>
          End on: &nbsp;
          <FlexFill />
          <HighlightText>
            {new Date(trip?.endDate).toLocaleDateString()}
          </HighlightText>
        </IconParagraph>
        <IconParagraph src={TimeIcon}>
          End at: &nbsp;
          <FlexFill />
          <HighlightText>
            {new Date(trip?.endDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </HighlightText>
        </IconParagraph>
      </Section>

      <Section>
        <SubTitle>Per diem:</SubTitle>
        <IconParagraph src={PerDiemIcon}>
          You spent there {daysFormatter.formatDaysLength(trip?.daysLength)}
          &nbsp;what gives&nbsp;
          <FlexFill />
          <HighlightText>
            {Number(getDiemRate(iso2(trip?.country)).amount) *
              Number(daysFormatter.calculateDiemBasis(trip?.daysLength))}
            {getDiemRate(iso2(trip?.country)).currency}
          </HighlightText>
        </IconParagraph>
      </Section>
    </Container>
  );
}
