import React, { useEffect } from "react";
import "../../app.css";
import Button from "../../components/button/Button";
import { useFormik } from "formik";
import { Validation } from "./validation";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/services/chatApi";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/features/authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const [loginUser, response] = useLoginUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(
        handleLogin({
          id: response.data.id,
          image: response.data.image,
          token: response.data.token,
        })
      );
      navigate("/main");
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUser({
        email: values.email,
        password: values.password,
      });
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
          <Button text="Login" type="submit" style={{ width: "80%" }} />
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
