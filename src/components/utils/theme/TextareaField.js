import React from 'react'

const TextareaField = ({ label, name, value, onChange, required = true }) => (
    <div className="flex flex-col">
      <label className="text-xs text-blue-600 mb-1">{label}</label>
      <textarea
        className="border p-2 rounded-md w-full"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
      ></textarea>
    </div>
  );
  

export default TextareaField
