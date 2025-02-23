import * as yup from "yup";

export const profileValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  FirstName: yup
    .string()
    .required("First Name is required")
    .min(5)
    .required("Min Name Length is 5 characters"),
  LastName: yup
    .string()
    .required("Last Name is required")
    .min(5)
    .required("Min Name Length is 5 characters"),
  phone: yup
    .string()
    .matches(
      /^(\+20|0)1[0-9]{9}$/,
      "Please enter a valid Egyptian phone number"
    )
    .required("Phone number is required"),
  gender: yup.string().oneOf(["male", "female"], "Gender is required"),
});


