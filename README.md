![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![Status](https://img.shields.io/badge/Project-v1completed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-lightgrey)



# 🛍️ Elhayl Store - Full Stack E-Commerce Project

Welcome to **Elhayl**, a full-stack e-commerce web application for browsing and purchasing home essentials like cups, spoons, and forks.

This platform provides users with seamless registration, product exploration, cart & wishlist management, secure authentication, and admin-level product control.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Sign up, log in, password reset, and OTP-based verification.
- 🛒 **Cart Management**
  - Add, remove, and update product quantities in the cart.
- 💖 **Wishlist Functionality**
  - Toggle and manage your favorite products.
- 📦 **Product Management**
  - Add, delete, and update product details and images.
- 🧑‍💼 **User Profile**
  - Manage addresses, personal details, and default shipping options.
- 🔎 **Product Search & Stock Check**
  - Easily find what you need and check item availability.

---

## 📁 Project Structure

- **Frontend:** Next js
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** OTP-based email verification + secure password handling

---

## 📡 API Endpoints

### 🔐 Authentication APIs

| Method | Endpoint                            | Description                    |
|--------|-------------------------------------|--------------------------------|
| POST   | `/Authentication/Login`             | Login user                     |
| POST   | `/Authentication/Sign up`           | Register user                  |
| POST   | `/Authentication/confirmEmail`      | Confirm OTP from email         |
| POST   | `/Authentication/regenerateOtp`     | Resend OTP                     |
| POST   | `/Authentication/Forget Password`   | Request password reset         |
| POST   | `/Authentication/validateResetOtp`  | Verify OTP for password reset  |
| POST   | `/Authentication/regeneratePasswordOtp` | Resend OTP for password reset |
| PATCH  | `/Authentication/Reset Password`    | Set a new password             |
| PATCH  | `/Authentication/Update Password`   | Update password (logged-in)    |

---

### 🛒 Cart APIs

| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| GET    | `/cart/cart`            | Get all cart items           |
| DELETE | `/cart/fromCart`        | Remove a specific item       |
| DELETE | `/cart/allCartItems`    | Clear the entire cart        |
| POST   | `/cart/toCart`          | Add product to cart          |
| PATCH  | `/cart/cartQuantaty`    | Update quantity of a product |

---

### 🛍️ Products APIs

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/Products/allProducts`   | Get all products             |
| GET    | `/Products/productById`   | Get product by ID            |
| GET    | `/Products/searchOnProduct` | Search products             |
| GET    | `/Products/CheckStock`    | Check product stock          |
| DELETE | `/Products/product`       | Delete a product             |
| DELETE | `/Products/image`         | Delete product image         |
| POST   | `/Products/Product`       | Add new product              |
| PATCH  | `/Products/product`       | Update product               |
| PATCH  | `/Products/Image`         | Update product image         |

---

### 👤 Users APIs

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/users/All Users`     | Get all users (admin)             |
| GET    | `/users/Address`       | Get all addresses of user         |
| GET    | `/users/DefaultAddress`| Get default shipping address      |
| DELETE | `/users/Me`            | Delete user account               |
| DELETE | `/users/Address`       | Delete a user address             |
| POST   | `/users/Address`       | Add a new address                 |
| PATCH  | `/users/DefaultAddress`| Set default address               |
| PATCH  | `/users/Address`       | Edit existing address             |
| PATCH  | `/users/Me`            | Update user profile               |

---

### 💖 Wishlist APIs

| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| GET    | `/Wishlist/wishList`     | Get wishlist items        |
| POST   | `/Wishlist/toggleWishList`| Add or remove from wishlist |

---

## 🧪 Future Improvements

- Admin dashboard for order and inventory management.
- Responsive design for mobile shopping.
- Integration with payment gateways (e.g., Stripe).
- Review & rating system for products.

---




## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yousseifmustafa/Hayl-Project.git

2.Install backend dependencies:
   ```bash
   cd backend
   npm install
```
3.Create .env file and configure:
   ```bash
   MONGO_URI=
   JWT_SECRET=
   OTP_EMAIL=
```
4.Run the backend server:
   ```bash
   npm run dev
```
5.Run frontend (if separate):
   ```bash
   cd frontend
   npm install
   npm start

```
<div align="right">
    Made with ❤️ by <a href="https://github.com/yousseifmustafa">Yousseif Mustafa</a>
</div>
