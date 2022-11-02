import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  will-change: opacity;

  cursor: pointer;
  border: 2px solid var(--primary-color);
  border-radius: 45px;
  padding: 16px 32px;
  background-color: transparent;
  font-family: Catamaran;
  color: var(--primary-color);
  font-size: 2.5vh;
  transition: 0.5s ease;
  margin-bottom: 32px;
  max-width: 426px;
  width: 100%;
  appearance: none;
  background-image: url("/arrow.svg");
  background-repeat: no-repeat;
  background-position: right 32px center;
  background-size: 1em;

  :focus {
    opacity: 0.7;
  }
  :hover {
    opacity: 0.7;
  }
`;

const StyledOption = styled.option`
  padding: 8px;
  border: 2px solid var(--primary-color);
`;

export default function Select({ options, handleChange, value }) {
  return (
    <StyledSelect aria-label="dropdown" value={value} onChange={handleChange}>
      {options.map((option, index) => (
        <StyledOption value={option.value} key={`${option.value}-${index}`}>
          {option.text}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}
