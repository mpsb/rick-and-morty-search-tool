import React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants";

const StyledFlex = styled.div`
  ${(props) => `
display: flex;
  flex-direction: ${props.flexDirection ? props.flexDirection : "row"};
  gap: ${props.gap}px;
  align-items: ${props.alignItems};
  justify-content: ${props.justifyContent};
  padding: ${props.padding ? props.padding : "64px"};
  width: ${props.width};

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    width: auto;
  }

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    flex-direction: ${props.fixFlexDirection ? props.flexDirection : "column"};
    padding: 16px;
  }
`}
`;
export default function Flex({
  className,
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  padding,
  width,
  fixFlexDirection,
  children,
}) {
  return (
    <StyledFlex
      className={className}
      flexDirection={flexDirection}
      gap={gap}
      alignItems={alignItems}
      justifyContent={justifyContent}
      padding={padding}
      width={width}
      fixFlexDirection={fixFlexDirection}
    >
      {children}
    </StyledFlex>
  );
}
