import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Minimum product name length is 5 characters")
    .max(30, "Maximum product name length is 30 characters")
    .required("Product name is required"),
  category: Yup.string()
    .min(5, "Minimum category length is 5 characters")
    .max(100, "Maximum category length is 100 characters")
    .required("Category is required"),
  description: Yup.string()
    .min(15, "Minimum description length is 15 characters")
    .max(200, "Maximum description length is 200 characters")
    .required("Description is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  priceAfterSale: Yup.number()
    .test(
      "is-less-than-price",
      "Price after sale cannot be greater than the original price",
      function (value) {
        return value <= this.parent.price;
      }
    )
    .required("Price after sale is required"),
  tags: Yup.string().oneOf(
    ["sale", "new", "bestseller", "featured"],
    "Invalid tag"
  ),
//   image: Yup.mixed()
//     .required("Image is required")
//     .test(
//       "fileFormat",
//       "The image must have a valid extension (jpeg, jpg, png, gif)",
//       (value) =>
//         value &&
//         ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
//           value.type
//         )
//     ),
});
