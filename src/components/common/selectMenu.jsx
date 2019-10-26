import React from "react";
const SelectMenu = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} className=" form-control" name={name} {...rest}>
        <option value="">Select Genre...</option>
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <small className=" text-danger">{error}</small>}
    </div>
  );
};

export default SelectMenu;
