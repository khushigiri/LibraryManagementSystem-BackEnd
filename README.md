# Library Management System (Backend)

A scalable **RESTful API** built using **Node.js, Express.js, and MongoDB** to manage library operations like book inventory, user memberships, book issuance tracking, and automated fine calculation.

**Live API:**
https://librarymanagementsystem-backend-2nrk.onrender.com

---

## Features

* Book Inventory Management (CRUD)
* User Membership System with Subscription Plans
* Book Issuance Tracking
* Automated Fine Calculation Engine
* Scalable Backend Architecture (MVC + DTO)
* Deployed on Render with MongoDB Atlas

---

## Tech Stack

| Category           | Technology    |
| ------------------ | ------------- |
| Runtime            | Node.js       |
| Framework          | Express.js    |
| Database           | MongoDB Atlas |
| ODM                | Mongoose      |
| Environment Config | Dotenv        |
| API Testing        | Postman       |
| Deployment         | Render        |

---

## Architecture & Design Patterns

### MVC Architecture

The application follows a clean **Model-View-Controller (MVC)** structure:

* **Models:** Define MongoDB schemas using Mongoose
* **Controllers:** Handle business logic and database operations
* **Routes:** Define API endpoints and map them to controllers

---

### DTO (Data Transfer Object)

DTOs are used to transform complex relational data into clean API responses.

**Example: IssuedBook DTO**

* Combines data from:

  * User
  * Book
  * Issue details
* Returns a **frontend-friendly structured response**

---

### Event-Driven DB Connection

MongoDB connection health is monitored using:

connection.on("error")
connection.once("open")

---

## Key Functionalities

### 1. Book Inventory Management

* Add, update, and fetch books
* Fields include:

  * Title
  * Author
  * Genre
  * Publisher
  * Price
* Automatic timestamps:

  * `createdAt`
  * `updatedAt`

---

### 2. User Membership System

Supports multiple subscription tiers:

| Plan     | Duration |
| -------- | -------- |
| Basic    | 90 days  |
| Standard | 180 days |
| Premium  | 365 days |

---

### 3. Issued Book Tracking

* Tracks issued books using MongoDB relationships
* Uses `Mongoose.populate()` to fetch related data

---

### 4. Fine Calculation Engine

Dynamic fine calculation based on:

* Subscription status
* Return date

**Rules:**

* Expired + Late → **100 units fine**
* Active + Late → **50 units fine**

---

## API Endpoints

### User Routes

| Method | Endpoint                        |
| ------ | ------------------------------- |
| GET    | /users                          |
| GET    | /users/:id                      |
| POST   | /users                          |
| PUT    | /users/:id                      |
| DELETE | /users/:id                      |
| GET    | /users/subscription-details/:id |

---

### Book Routes

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /books                |
| GET    | /books/:id            |
| GET    | /books/issued/by-user |
| POST   | /books                |
| PUT    | /books/:id            |

---

## API Testing

All endpoints were tested using **Postman**:

* Request validation
* Database operations
* Error handling
* Business logic verification

---

## Deployment

* Backend deployed on **Render**
* Database hosted on **MongoDB Atlas**
* Environment variables managed using **Dotenv**

---

## What I Learned

* Designing scalable REST APIs
* Implementing MVC architecture in real projects
* Handling MongoDB relationships using Mongoose
* Solving real-world deployment issues (IP whitelisting, env config)
* Working with production-ready backend systems

---
