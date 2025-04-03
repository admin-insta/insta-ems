import React from "react";

const InputField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  required = true, 
  disabled = false 
}) => (
  <div className="flex flex-col">
    <label className="text-xs text-blue-600 mb-1">{label}</label>
    <div className="relative flex items-center border p-2 rounded-md w-full bg-white">
      {typeof value === "string" || typeof value === "number" ? (
        <input
          className={`w-full bg-white outline-none ${disabled ? "cursor-default bg-gray-200" : ""}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          required={required}
          disabled={disabled}
        />
      ) : (
        <div className="w-full flex items-center bg-white">
          {value}
        </div>
      )}
    </div>
  </div>
);

export default InputField;
