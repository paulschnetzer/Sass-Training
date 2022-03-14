import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../img/wag-logo.png";
export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <a href="#">
        <img src={logo} alt="Wag zurück zu Homepage" />
      </a>
      <div className={styles.navLinks}>
        <a href="#">Hauptmenü</a>
        <a href="#">Hilfe</a>
        <a href="#" className={styles.loginPage}>
          Paul.Schnetzer@atwork.at
        </a>
      </div>
      <div className={styles.mobileLinks}>
        <button>
          Menu
          <div className={styles.hamburger}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
    </nav>
  );
}
