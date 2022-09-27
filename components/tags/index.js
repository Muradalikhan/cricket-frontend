import React from "react";
import styles from "../../styles/Component.module.css";

const Tags = ({ Icon, tag }) => {
  return (
    <div
      className={styles.tag}
      style={{
        backgroundColor: tag.includes("Favorite") ? "#ef476f" : "#bde0fe",
      }}
    >
      {Icon && Icon}
      {tag}
    </div>
  );
};

export default Tags;
