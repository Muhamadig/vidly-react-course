import React from "react";
const ButtonGroup = props => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty
  } = props;
  return (
    <div className="btn-group-vertical" role="group" aria-label="Button Group">
      {items.map(item => (
        <button
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          type="button"
          className={
            selectedItem === item ? "btn btn-primary active" : "btn btn-primary"
          }
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};
ButtonGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ButtonGroup;
