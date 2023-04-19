import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-pages";
import LoginPage from "../pages/login-pages/Index";
import SignupPage from "../pages/signup-pages/Index";
import ErrorPage from "../pages/error-pages/Index";
import MainPage from "../pages/main-pages/Index";
import Protected from "./Protected";
import NAV_PHAT from "../constants/NAV_PHAT";

function Navigation() {
  const isLogin = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NAV_PHAT.HOME} element={<HomePage />} />

        {/* Auth Routes */}
        <Route path={NAV_PHAT.LOGIN} element={<LoginPage />} />
        <Route path={NAV_PHAT.SIGNUP} element={<SignupPage />} />

        {/* Main Routes */}
        <Route
          path={NAV_PHAT.MAIN}
          element={
            <Protected isLogin={isLogin}>
              <MainPage />
            </Protected>
          }
        />

        {/* error route */}
        <Route path={NAV_PHAT.ERROR} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
