import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must include at least one letter, one number, and one special character"
    )
    .required("Password is required"),
});
