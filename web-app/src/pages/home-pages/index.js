import React from "react";
import "../../app.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { NAV_PHAT } from "../../constants/NAV_PHAT";
import { Box } from "@chakra-ui/react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Box
        height={["100%", "100%", "90%"]}
        display={["flex"]}
        bg={"#ecf2ff"}
        borderRadius={"md"}
        width={["100%", "100%", "50%"]}
        flexDirection={"column"}
        p={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
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
      </Box>
    </div>
  );
}
