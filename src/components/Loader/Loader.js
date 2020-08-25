import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Loader.module.css";

const LoaderSpinner = () => {
  return (
    <div className={styles.loaderSpinner}>
      <Loader
        type="Rings"
        color="rgb(136, 136, 136)"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default LoaderSpinner;
