import * as yup from "yup";

class Validation {
  // yup input field validation
  static formValidation = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(6).max(15).required("Please is required"),
  });

  static emailError(formik) {
    return (
      <span className="error">
        {formik.touched.email && formik.errors.email && formik.errors.email}
      </span>
    );
  }
  static passwordError(formik) {
    return (
      <span className="error">
        {formik.touched.password &&
          formik.errors.password &&
          formik.errors.password}
      </span>
    );
  }
}

export { Validation };
