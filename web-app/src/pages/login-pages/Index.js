import React from "react";
import "../../app.css";
import Button from "../../components/button/Button";
import { useFormik } from "formik";
import { Validation } from "./validation";

function LoginPage() {
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
        <h1 className="login-title">Login to your account</h1>
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
          <Button text="Login" type="submit" style={{ width: "80%" }} />
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
