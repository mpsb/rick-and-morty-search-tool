import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 45px;
  color: white;
  font-size: 2.5vh;
  font-family: "Catamaran";
  font-weight: 600;
  padding: 16px 0px;
  max-width: 426px;
  width: 100%;
  cursor: pointer;
  margin-top: 32px;
  transition: 0.2s ease;

  :hover {
    transform: perspective(100px) translateZ(2px);
    background-color: var(--grey);
    border: 2px solid var(--grey);
  }
`;

export default function Button({ children, handleButtonClick }) {
  return <StyledButton onClick={handleButtonClick}>{children}</StyledButton>;
}
