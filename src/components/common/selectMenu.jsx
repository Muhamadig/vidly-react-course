import React from "react";
const SelectMenu = ({
  label,
  name,
  options,
  value,
  autoFocus = false,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        className=" form-control"
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        name={name}
      >
        {options.length === 0 ? (
          <option value="">No {label} To Show</option>
        ) : (
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default SelectMenu;
