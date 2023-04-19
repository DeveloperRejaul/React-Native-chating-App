import React from "react";
import "../../app.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Box, Text } from "@chakra-ui/react";
import NAV_PHAT from "../../constants/NAV_PHAT";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="innerContainer">
        <Button
          text="Login"
          style={{ backgroundColor: "#62cdff", width: "60%" }}
          onClick={() => navigate(NAV_PHAT.LOGIN)}
        />
        <Button
          text="Sign Up"
          style={{ backgroundColor: "#62cdff", width: "60%" }}
          onClick={() => navigate(NAV_PHAT.SIGNUP)}
        />
      </div>
    </div>
  );
}
