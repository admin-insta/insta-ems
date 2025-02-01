import React from "react";
import theme from "../theme";

const Input = ({ label, type = "text", placeholder }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
      <label style={{ marginBottom: "6px", fontWeight: "bold" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          padding: "10px",
          border: `1px solid ${theme.colors.textSecondary}`,
          borderRadius: theme.borderRadius,
          outline: "none",
        }}
      />
    </div>
  );
};

export default Input;
