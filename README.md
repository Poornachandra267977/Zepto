# Zepto Clone 🚀

A fully functional Zepto-inspired e-commerce web application built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. Users can browse products, search, filter by categories, add items to cart, log in/sign up, and complete payments via Stripe.

---

## 🔥 Features

### 👤 User Features
- Sign Up / Log In (via Firebase Auth)
- View all products by category
- Add/Remove products from cart
- Stripe payment (Card / UPI / COD options)
- Order summary and confirmation

### 🛍️ Vendor Dashboard
- Vendor sign up and login
- Add and manage products
- Products are linked to vendor ID

### 🛠️ Admin Dashboard
- View all vendors
- Delete vendors or products
- Full control of the backend data

---

## 🛠️ Tech Stack

| Layer       | Tech |
|-------------|------|
| Frontend    | React, Tailwind CSS, Redux |
| Backend     | Node.js, Express.js |
| Database    | MongoDB (via Mongoose) |
| Auth        | Firebase Authentication |
| Payments    | Stripe (Elements) |

---

## 📁 Project Structure

💳 Payment (Stripe)
This app uses Stripe Elements for secure checkout:

Card payments with card number, expiry, and CVV

UPI input field or QR simulation

Cash on Delivery option