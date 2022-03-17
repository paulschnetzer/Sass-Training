import React from "react";
import styles from "./AlternativeStatus.module.css";

export default function Loader(props: any) {
  if (!props.data) {
    return (
      <>
        <div className={styles.loadingWheelDiv}>
          <div className={styles.loadingWheel}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span>Loading Data ...</span>
        </div>
      </>
    );
  } else {
    return <div className={styles.warning}>Keine Einträge gefunden</div>;
  }
}
