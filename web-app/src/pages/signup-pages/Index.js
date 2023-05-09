import React, { useState } from "react";
import "../../app.css";
import { Formik } from "formik";
import { formValidation } from "./formValidation";
import Button from "../../components/button/Button";
import { API_URL } from "../../config/config";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function SignupPage() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <div className="container">
      <div className="innerContainer">
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={formValidation}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("avatar", file);
            formData.append(
              "data",
              JSON.stringify({
                name: values.userName,
                email: values.email,
                password: values.confirmPassword,
              })
            );

            try {
              setLoading(true);
              const url = `${API_URL}/user/register/`;
              const data = await axios.post(url, formData);
              setLoading(false);
              if (data.status == 200) {
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  position: "top-right",
                });
              }
            } catch (e) {
              toast({
                title: e.response.data.message,
                description: "We've not created your account for you.",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-right",
              });
            }
          }}
        >
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="signup-input-body">
                <div className="labelBody">
                  <label className="label" htmlFor="userName">
                    User name *
                  </label>
                  {errors.userName && touched.userName && (
                    <span className="error"> {errors.userName} </span>
                  )}
                </div>
                <input
                  type="text"
                  className="input"
                  name="userName"
                  id="userName"
                  placeholder="Inter your user name"
                  value={values.userName}
                  onChange={handleChange}
                />
              </div>
              {/* Email field */}
              <div className="signup-input-body">
                <div className="labelBody">
                  <label className="label" htmlFor="email">
                    Email *
                  </label>
                  {errors.email && touched.email && (
                    <span className="error"> {errors.email} </span>
                  )}
                </div>

                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Inter your user email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              {/* Password field  */}
              <div className="signup-input-body">
                <div className="labelBody">
                  <label className="label" htmlFor="password">
                    Password *
                  </label>
                  {errors.password && touched.password && (
                    <span className="error"> {errors.password} </span>
                  )}
                </div>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Inter your password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>

              {/* confirm password field  */}

              <div className="signup-input-body">
                <div className="labelBody">
                  <label className="label" htmlFor="confirmPassword">
                    Confirm password *
                  </label>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="error"> {errors.confirmPassword} </span>
                  )}
                </div>
                <input
                  type="password"
                  className="input"
                  name="confirmPassword"
                  placeholder="Inter your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* file field */}
              <div className="signup-input-body">
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {/* <img src={""} alt="" /> */}
              <Button text="Sign Up" type="submit" />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignupPage;
