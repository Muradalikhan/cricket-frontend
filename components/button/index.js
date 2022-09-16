import React from "react";
import styles from "../../styles/Component.module.css";

const Button = (props) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
