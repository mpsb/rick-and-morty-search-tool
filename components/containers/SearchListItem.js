import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Flex from "@components/containers/Flex";
import Body from "@components/text/Body";

const StyledSearchListItem = styled.div`
  will-change: transform;
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

// go to globals.css to check root variables
const StatusColorMappings = {
  Alive: "var(--green)",
  Dead: "var(--red)",
  Unknown: "var(--grey)",
  Viva: "var(--green)",
  Muerta: "var(--red)",
  Desconocida: "var(--grey)",
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
          <Image
            className="avatar-image"
            src={imageUrl}
            width={70}
            height={70}
            alt={`Avatar of ${name}.`}
          />
          <Body>{name}</Body>
        </Flex>
        <StyledStatus color={StatusColorMappings[status]}>
          {status}
        </StyledStatus>
      </Flex>
    </StyledSearchListItem>
  );
}
