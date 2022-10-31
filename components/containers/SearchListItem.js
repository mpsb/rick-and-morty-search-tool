import React from "react";
import styled from "styled-components";
import Flex from "@components/containers/Flex";
import Body from "@components/text/Body";

const StyledSearchListItem = styled.div`
  border: 2px solid var(--primary-color);
  border-radius: 16px;
  width: 100%;
`;

const StyledStatus = styled.span`
  ${(props) => `
    color: ${props.color};
`}
  font-size: 2.5vh;
  margin: 0;
  font-weight: 700;
`;

const StyledImageContainer = styled.div`
  border: 2px solid #000000;
  border-radius: 45px;
  width: 70px;
  height: 70px;
  ${(props) => `
    background: url(${props.imageUrl});
`}
`;

const StatusColorMappings = {
  alive: "#1EC02F",
  dead: "#C01E1E",
  unknown: "#969696",
};

export default function SearchListItem({ status, imageUrl }) {
  return (
    <StyledSearchListItem>
      <Flex
        padding="16px 32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex padding="0" gap={16} alignItems="center">
          <StyledImageContainer imageUrl={imageUrl} />
          <Body>Rick Sanchez</Body>
        </Flex>
        <StyledStatus color={StatusColorMappings[status]}>ALIVE</StyledStatus>
      </Flex>
    </StyledSearchListItem>
  );
}