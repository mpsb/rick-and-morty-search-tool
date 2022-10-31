import React from "react";
import styled from "styled-components";

const StyledSubheader = styled.h2`
  font-size: 4.5vh;
  font-weight: 400;
  text-align: center;
  margin: 0;
  margin-bottom: 48px;
`;

export default function Subheader({ children }) {
  return <StyledSubheader>{children}</StyledSubheader>;
}
