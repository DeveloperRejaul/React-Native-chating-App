import React from "react";
import "../../app.css";
import Button from "../../components/button/Button";
import { useFormik } from "formik";
import { Validation } from "./validation";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NAV_PHAT from "../../constants/NAV_PHAT";

function LoginPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert("Submit Data");
    },
    validationSchema: Validation.formValidation,
  });

  return (
    <div className="container">
      <div className="inner-container">
        <Text
          fontSize={[25, 30, 35]}
          fontWeight={[600]}
          marginBottom={[10]}
          color={["black"]}
        >
          Login to your account
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-body">
            <label className="input-label" htmlFor="email">
              Email * {Validation.emailError(formik)}
            </label>

            <input
              type="email"
              name="email"
              id="email"
              className="input"
              onChange={formik.handleChange}
            />
          </div>

          <div className="input-body">
            <label className="input-label" htmlFor="password">
              Password * {Validation.passwordError(formik)}
            </label>

            <input
              type="password"
              name="password"
              id="password"
              className="input"
              onChange={formik.handleChange}
            />
          </div>
          <Button
            text="Login"
            type="submit"
            style={{ width: "80%" }}
            onClick={() => navigate(NAV_PHAT.MAIN)}
          />
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
