import React from 'react'

const InputField = ({ label, type = "text", name, value, onChange, required = true }) => (
    <div className="flex flex-col">
      <label className="text-xs text-blue-600 mb-1">{label}</label>
      <input
        className="border p-2 rounded-md w-full"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
      />
    </div>
  );
  

export default InputField
