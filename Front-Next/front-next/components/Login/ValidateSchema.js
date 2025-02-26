import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters.")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character")
    .required("password is required"),
});
