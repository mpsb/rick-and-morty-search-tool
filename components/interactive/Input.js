import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 2px solid var(--primary-color);
  padding: 16px 32px;
  background-color: transparent;
  font-family: Catamaran;
  color: var(--primary-color);
  font-size: 2.5vh;
  border-radius: 45px;
  transition: 0.5s ease;
  margin: 24px 0px;
  max-width: 426px;
  width: 100%;
  will-change: border;

  ::placeholder {
    color: var(--placeholder-color);
  }
  :focus {
    outline: none;
    border: 2px solid var(--grey);
  }
  :hover {
    border: 2px solid var(--grey);
  }
`;

export default function Input({ placeholder, handleChange, value }) {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}
