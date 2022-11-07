import styled from "styled-components";
import countries, { iso2 } from "../../../utils/countries";
import breakpoints from "../../../theme/breakpoints";
import Flag from "react-world-flags";

import { useEffect, useState, useRef } from "react";

import Icon from "../../../components/Icon";
import DropdownIcon from "../../../assets/icons/down-arrow.svg";

const SelectContainer = styled.div`
  width: 100%;
`;

const Select = styled.div`
  padding: 0.6em 0.5em 0.6em 3em;
  background-color: var(--black);
  color: var(--white);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 1em;

  &:focus,
  &:focus-visible {
    color: var(--white);
    background-color: var(--black);
    outline: 3px solid var(--accent);
  }

  @media only screen and ${breakpoints.laptop} {
    font-size: 1.1em;
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0.5em 0.5em 0.5em 2.5em;
    font-size: 1.3em;
  }
`;

const SelectedOption = styled.div`
  box-sizing: border-box;
  color: var(--white);
`;

const OptionWrapper = styled.span`
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.92);
  box-sizing: border-box;
  margin: 0 auto;
  height: 30vh;
  min-height: 120px;
  max-height: 400px;
  overflow-y: scroll;
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 2.6em;
  left: 0;
  top: 0;
  border-radius: 20px;
`;

const CountryOption = styled.div`
  padding: 0.3em 3em;
  box-sizing: border-box;
  color: var(--white);
  border-bottom: 1px solid var(--gray);
  &:hover {
    background-color: var(--primary);
  }
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.4em;
`;

const NotSelectedFallback = styled.span``;

export default function CountrySelect({ value, onChange, labelText }) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowOptions(false);
      } else {
        setShowOptions(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const [showOptions, setShowOptions] = useState(false);
  function handleOptionClick(country) {
    setShowOptions((prev) => !prev);
    onChange(country);
  }

  const countriesEntries = Object.entries(countries).sort((a, b) =>
    ("" + a[1]).localeCompare(b[1])
  );

  return (
    <SelectContainer ref={ref}>
      <Label>{labelText}</Label>

      <Select tabIndex={0}>
        {value ? (
          <SelectedOption>
            <Flag
              code={iso2(value)}
              height="16px"
              width="24px"
              style={{
                marginRight: "8px",
                position: "relative",
                top: "3px",
              }}
            />
            {value}
          </SelectedOption>
        ) : (
          <NotSelectedFallback>Pick country</NotSelectedFallback>
        )}
        <Icon src={DropdownIcon} height="24px" width="24px"></Icon>
        <OptionWrapper visible={showOptions}>
          {countriesEntries.map((entry, i) => (
            <CountryOption key={i} onClick={() => handleOptionClick(entry[1])}>
              <Flag
                code={entry[0]}
                height="16px"
                width="24px"
                style={{
                  marginRight: "8px",
                  position: "relative",
                  top: "3px",
                }}
              />
              {entry[1]}
            </CountryOption>
          ))}
        </OptionWrapper>
      </Select>
    </SelectContainer>
  );
}
