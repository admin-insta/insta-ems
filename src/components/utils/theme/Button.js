import React from "react";
import styled from "styled-components";
import theme from "./theme";

// Using $ prefix to make the variant prop transient
const StyledButton = styled.button`
  padding: 8px 14px;
  font-size: 1rem;
  border-radius: ${theme.borderRadius};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: auto;
  background: ${(props) => (props.$variant === "primary" ? theme.colors.primary : theme.colors.secondary)};
  color: white;

  /* Responsive Styles */
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 16px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 4px 8px;
    font-size: 0.5rem;
  }

  @media (max-width: 370px) {
    width: 100%;
    padding: 4px 8px;
    font-size: 0.5rem;
  }
`;

const Button = ({ children, onClick, variant = "primary" }) => {
  return (
    <StyledButton $variant={variant} type="button" onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
