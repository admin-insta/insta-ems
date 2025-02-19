import React from "react";
import styled from "styled-components";
import theme from "./theme";

// Styled Card Component
const StyledCard = styled.div`
  background: ${(props) =>
    props.$variant === "primary"
      ? theme.colors.cardPrimary
      : theme.colors.cardSecondary};
  border-radius: ${theme.borderRadius};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 4px;
  transition: all 0.3s ease-in-out;
  width: 100%;
  cursor: pointer;

  /* Full Screen Option */
  ${(props) =>
    props.$fullScreen &&
    `
       min-height: 100vh; /* Minimum height for full screen */
    max-height: 100vh; /* Prevent overflow beyond screen height */
    overflow-y: auto;  /* Enable vertical scrolling */
    display: flex;
    flex-direction: column;
       /* Thin Scrollbar */
    scrollbar-width: thin; /* Firefox */
    // scrollbar-color: #b0b0b0 transparent; /* Firefox */
    `}

  /* Responsive Styles */
  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  /* Optional: Add border styles based on variant */
  border: ${(props) => (props.$variant === "primary" ? "none" : `none`)};
`;

// Card Image Styling
const CardImage = styled.img`
  border-radius: ${theme.borderRadius};
  width: 100%;
  height: auto;
  padding: 4px;
  max-height: 200px; /* Adjust height based on your preference */
  margin-bottom: 8px;
  object-position: center;
`;

// Card Content Styling
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${theme.colors.textPrimary};
  padding: 2px;
`;

const CardDescription = styled.div`
  font-size: 1rem;
  color: ${theme.colors.textPrimary};
  padding: 2px;
  height: auto;
`;

// Card Component
const Card = ({
  variant = "primary",
  title,
  description,
  image, // Optional image prop
  onClick,
  fullScreen = false, // New prop for full-screen functionality
}) => {
  return (
    <StyledCard $variant={variant} onClick={onClick} $fullScreen={fullScreen}>
      {image && <CardImage src={image} alt={title} />}
      <CardContent>
        <CardTitle $variant={variant}>{title}</CardTitle>
        <CardDescription $variant={variant}>{description}</CardDescription>
      </CardContent>
    </StyledCard>
  );
};

export default Card;
