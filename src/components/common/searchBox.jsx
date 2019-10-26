import React from "react";
const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default SearchBox;
