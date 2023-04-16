import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-pages";
import LoginPage from "../pages/login-pages/Index";
import SignupPage from "../pages/signup-pages/Index";
import ErrorPage from "../pages/error-pages/Index";
import MainPage from "../pages/main-pages/Index";
import ChatPage from "../pages/chat-pages/Index";
import Protected from "./Protected";

function Navigation() {
  const isLogin = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth Routes */}
        <Route path="/auth/Login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        {/* Main Routes */}
        <Route
          path="/main"
          element={
            <Protected isLogin={isLogin}>
              <MainPage />
            </Protected>
          }
        />
        <Route
          path="/chat"
          element={
            <Protected isLogin={isLogin}>
              <ChatPage />
            </Protected>
          }
        />

        {/* error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
