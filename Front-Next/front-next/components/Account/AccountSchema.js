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

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters.")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const AddressSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  phone: yup
    .string()
    .matches(
      /^(\+20|0)1[0-9]{9}$/,
      "Please enter a valid Egyptian phone number"
    )
    .required("Phone Number is required"),
  department: yup.string().required("Department is required"),
  street: yup.string().required("Street is required"),
  building: yup.string().required("Building is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup
    .number()
    .typeError("Postal Code must be a number")
    .required("Postal Code is required"),
  isDefault: yup.boolean(),
});
