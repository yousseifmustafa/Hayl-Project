import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  FirstName: Yup.string()
    .min(5, "Minimum length is 5 characters")
    .max(30, "Maximum length is 30 characters")
    .required("First name is required"),

  LastName: Yup.string()
    .min(5, "Minimum length is 5 characters")
    .max(30, "Maximum length is 30 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#^-_=?؟@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),

});
