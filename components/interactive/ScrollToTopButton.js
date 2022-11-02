import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledScrollToTopButton = styled.button`
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 45px;
  color: white;
  font-size: 2.5vh;
  font-family: "Catamaran";
  font-weight: 600;
  position: fixed;
  right: 1%;
  bottom: 1%;
  transform: translate(-1%, -1%);
  width: auto;
  max-width: 320px;
  cursor: pointer;
  padding: 8px 24px;
`;

export default function ScrollToTopButton({ children }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  function handleButtonClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []);

  if (showScrollButton)
    return (
      <StyledScrollToTopButton onClick={handleButtonClick}>
        {children}
      </StyledScrollToTopButton>
    );
}