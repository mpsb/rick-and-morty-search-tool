import React from "react";
import styled from "styled-components";
import Flex from "@components/containers/Flex";
import Body from "@components/text/Body";

const StyledSearchListItem = styled.div`
  border: 2px solid var(--primary-color);
  border-radius: 16px;
  width: 100%;
  max-width: 1024px;
  margin-bottom: 16px;
  transition: 0.2s ease;

  :hover {
    transform: perspective(100px) translateZ(5px);
  }
`;

const StyledStatus = styled.span`
  ${(props) => `
    color: ${props.color};
`}
  font-size: 2.5vh;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
`;

const StyledImageContainer = styled.div`
  border: 2px solid #000000;
  border-radius: 45px;
  width: 70px;
  height: 70px;
  ${(props) => `
    background: url(${props.imageUrl});
`}
  background-size: contain;
`;

const StatusColorMappings = {
  Alive: "#1EC02F",
  Dead: "#C01E1E",
  unknown: "#969696",
  Viva: "#1EC02F",
  Muerta: "#C01E1E",
  Desconocida: "#969696",
};

export default function SearchListItem({ status, imageUrl, name }) {
  return (
    <StyledSearchListItem>
      <Flex
        padding="16px 32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex padding="0" gap={16} alignItems="center">
          <StyledImageContainer imageUrl={imageUrl} />
          <Body>{name}</Body>
        </Flex>
        <StyledStatus color={StatusColorMappings[status]}>
          {status}
        </StyledStatus>
      </Flex>
    </StyledSearchListItem>
  );
}
