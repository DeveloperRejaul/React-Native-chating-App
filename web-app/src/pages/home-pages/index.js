import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <button className={styles.btn} onClick={() => navigate("/auth/login")}>
          Login
        </button>
        <button className={styles.btn} onClick={() => navigate("/auth/signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
}
