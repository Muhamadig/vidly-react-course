import React from "react";
const Input = props => {
  const { label, type, value, onChange, name, isAutoFocus, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={isAutoFocus}
        //   ref={this.username}
        id={name}
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default Input;
