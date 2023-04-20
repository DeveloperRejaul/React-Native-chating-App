import React from "react";
import { Navigate } from "react-router-dom";
import { NAV_PHAT } from "../constants/NAV_PHAT";

function Protected({ isLogin, children }) {
  if (!isLogin) {
    return <Navigate to={NAV_PHAT.HOME} replace />;
  } else {
    return children;
  }
}

export default Protected;
