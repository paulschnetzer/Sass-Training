import React, { FC, useState } from "react";
import styles from "./CollapsibleSubsection.module.css";
interface ICollapsibleSubsection {
  Title: string;
  height: string;
}
export const CollapsibleSubsection: FC<ICollapsibleSubsection> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div>
        <div
          className={styles.collapseToggle}
          onClick={handleToggle}
          role="button"
          aria-label={props.Title}
          aria-expanded={isVisible}
        >
          <h2>
            <i className={styles.arrowDown}></i>
            {props.Title}
          </h2>
        </div>
      </div>
      <div
        style={{ height: isVisible ? props.height : "0px" }}
        className={styles.content}
      >
        {props.children}
      </div>
    </>
  );
};
