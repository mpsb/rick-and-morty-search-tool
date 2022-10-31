import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 7vh;
  text-align: center;
  margin: 0;
  margin-bottom: 16px;
`;

export default function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}
