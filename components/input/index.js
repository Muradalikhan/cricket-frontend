import React from "react";



const Input = (props) => {
  return (
    <div>
      {props.label && <div style={{padding:"5px"}}>{props.label}</div>}
      <input type={props.type} value={props.value} {...props} />
    </div>
  );
};

export default Input;
