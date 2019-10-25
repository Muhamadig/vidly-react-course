import React from "react";
const Menu = ({ label, name, data, autoFocus = false }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div id={name} className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        ></button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {data.map(option => (
            <button key={option.value} className="dropdown-item" type="button">
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
