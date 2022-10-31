import React from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledImage = styled(Image)`
  cursor: pointer;
`;

export default function ClickableImage(props) {
  return <StyledImage {...props} />;
}
