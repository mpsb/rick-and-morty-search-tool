import React from "react";
import styled from "styled-components";

const StyledBody = styled.span`
  font-size: 2.5vh;
  text-align: center;
  margin: 0;
`;

export default function Body({ children }) {
  return <StyledBody>{children}</StyledBody>;
}
