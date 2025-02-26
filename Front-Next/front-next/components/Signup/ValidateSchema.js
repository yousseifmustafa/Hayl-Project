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
    .max(128, "Password cannot exceed 128 characters.")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character")
    .required(" password is required"),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
