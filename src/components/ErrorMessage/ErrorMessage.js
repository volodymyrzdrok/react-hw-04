import React from "react";
import Loader from "react-loader-spinner";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ text }) => {
  return (
    <div className={styles.errorContainer}>
      <Loader type="TailSpin" color="#ca1e1e" height={100} width={100} />
      <h2 className={styles.text}>whoops,but : {text}</h2>
    </div>
  );
};

export default ErrorMessage;
