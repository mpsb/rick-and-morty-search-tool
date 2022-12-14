import React from "react";
import styled from "styled-components";
import Body from "@components/text/Body";

const StyledLoadingIndicator = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px var(--primary-color) solid;
  z-index: 2;
  background-color: white;
  padding: 32px;
  border-radius: 16px;
`;

export default function LoadingIndicator({ loadingDescription }) {
  return (
    <StyledLoadingIndicator>
      <Body>{loadingDescription}</Body>
    </StyledLoadingIndicator>
  );
}
