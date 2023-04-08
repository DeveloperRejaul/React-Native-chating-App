import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const formValidation = yup.object().shape({
  apples: yup.number().required().positive().integer(),
  name: yup.string().required().min(2),
});

function LoginPage() {
  return (
    <Formik
      initialValues={{
        apples: 0,
        name: "",
      }}
      validationSchema={formValidation}
      onSubmit={(values) => {
        // TODO: buy apples
      }}
    >
      {({
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          {errors.apples && touched.apples && (
            <p style={{ color: "red" }}> {errors.apples} </p>
          )}
          <label htmlFor="apples">
            <span>Apples:</span>
            <input
              name="apples"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.apples}
              required
            />
          </label>

          {errors.name && touched.name && (
            <p style={{ color: "red" }}> {errors.name} </p>
          )}
          <label htmlFor="name">
            <span>Name:</span>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              required
            />
          </label>
          <button type="submit">Buy apples</button>
        </form>
      )}
    </Formik>
  );
}
export default LoginPage;
