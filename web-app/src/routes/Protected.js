import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isLogin, Children }) {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  } else {
    return Children;
  }
}

export default Protected;
