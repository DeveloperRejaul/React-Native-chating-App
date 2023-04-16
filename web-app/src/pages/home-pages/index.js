import React from "react";
import "../../app.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="innerContainer">
        <Button
          text="Login"
          style={{ backgroundColor: "#62cdff", width: "60%" }}
          onClick={() => navigate("/auth/login")}
        />
        <Button
          text="Sign Up"
          style={{ backgroundColor: "#62cdff", width: "60%" }}
          onClick={() => navigate("/auth/signup")}
        />
      </div>
    </div>
  );
}
