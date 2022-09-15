import React from "react";

const Input = (props) => {
  return (
    <div>
      <p>{props.label}</p>
      <input type={props.type} value={props.value} {...props} />
    </div>
  );
};

export default Input;
