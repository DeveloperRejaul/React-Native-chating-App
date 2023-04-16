import React from "react";
import "./style.css";

function Button({ text, onClick, type, style }) {
  return (
    <button className="btn" style={style} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
