import * as yup from "yup";
export const formValidation = yup.object().shape({
  userName: yup
    .string()
    .min(5, "Name must be 5 creature")
    .required("User name is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().min(6).max(20).required("Please is required"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
