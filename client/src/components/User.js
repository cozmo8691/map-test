import React from "react";
import styles from "./styles/User.module.css";

const User = () => {
  return (
    <div className={styles.userPanel}>
      <span className="material-icons md-18">account_circle</span>
      <span className={styles.name}>name@apha.gsi.gov.uk</span>
    </div>
  );
};

export default User;
