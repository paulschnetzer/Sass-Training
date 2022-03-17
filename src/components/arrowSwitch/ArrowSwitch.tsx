import React, { FC } from "react";
import styles from "./ArrowSwitch.module.css";

interface IArrowSwitch {
  mode: string;
}

export const ArrowSwitch: FC<IArrowSwitch> = (props) => {
  if (props.mode === "down") {
    return (
      <>
        <span>
          <i
            role="img"
            aria-label="Sortierung absteigend"
            className={styles.arrowdown}
          ></i>
        </span>
      </>
    );
  } else if (props.mode === "up") {
    return (
      <>
        <span>
          <i
            className={styles.arrowup}
            role="img"
            aria-label="Sortierung aufsteigend"
          ></i>
        </span>
      </>
    );
  } else {
    return <></>;
  }
};
