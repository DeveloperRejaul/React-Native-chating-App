import React from "react";
import MainScreen from "./MainScreen";
import { ChatProvider } from "../../context/ChatContext";

export default function MainPage() {
  return (
    <ChatProvider>
      <MainScreen />
    </ChatProvider>
  );
}
