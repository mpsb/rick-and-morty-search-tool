import React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants";

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  gap: ${(props) => props.gap}px;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  padding: 64px;

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    width: auto;
  }

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    padding: 64px 16px;
  }
`;

export default function Flex({
  className,
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  children,
}) {
  return (
    <StyledFlex
      className={className}
      flexDirection={flexDirection}
      gap={gap}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </StyledFlex>
  );
}
