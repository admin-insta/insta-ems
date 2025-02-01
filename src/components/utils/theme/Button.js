import React from "react";
import theme from "./theme";

const Button = ({ children, onClick, variant = "primary" }) => {
  const styles = {
    primary: {
      background: theme.colors.primary,
      color: "white",
      padding: "8px 14px",
      fontSize: "1rem",
      borderRadius: theme.borderRadius,
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      width: "auto",
    },
    secondary: {
      background: theme.colors.secondary,
      color: "white",
      padding: "8px 14px",
      fontSize: "1rem",
      borderRadius: theme.borderRadius,
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      width: "auto",
    },
  };

  return (
    <button style={{ ...styles[variant], ...responsiveStyles }} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

// Responsive Styles
const responsiveStyles = {
  width: "auto",
  "@media (max-width: 768px)": {
    width: "100%", // Full width on smaller screens
    padding: "10px 16px",
    fontSize: "0.8rem",
  },
  "@media (max-width: 480px)": {
    width: "100%",
    padding: "4px 8px",
    fontSize: "0.5rem",
  },
  "@media (max-width: 370px)": {
    width: "100%",
    padding: "4px 8px",
    fontSize: "0.5rem",
  },
};

export default Button;
