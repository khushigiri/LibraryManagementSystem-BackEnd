# Library Management System (Backend)

The **Library Management System Backend** is a RESTful API built using **Node.js, Express.js, and MongoDB** to manage library operations such as book inventory, user memberships, book issuance tracking, and fine calculation.

The system follows **clean backend architecture principles**, including the **MVC pattern**, **DTO transformation**, and **MongoDB relational modeling using Mongoose**. It demonstrates how scalable backend APIs can be built for real-world applications.

---

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **Object Modeling:** Mongoose ODM
* **Environment Management:** Dotenv
* **API Testing:** Postman

---

## Architecture & Design Patterns

### MVC Architecture

The application follows the **Model-View-Controller pattern**:

* **Models:** Define MongoDB schema using Mongoose.
* **Controllers:** Handle business logic and database operations.
* **Routes:** Define REST API endpoints and connect them to controllers.

This ensures a **clean separation of concerns**.

---

### DTO (Data Transfer Object)

A **DTO layer** is used to transform complex database relationships into clean responses.

Example: `IssuedBook DTO`

This flattens data from:

* User
* Book
* Issue information

into a **frontend-friendly response format**.

---

### Event-Driven Database Connection

MongoDB connection health is monitored using **Mongoose event listeners**.

* `connection.on("error")`
* `connection.once("open")`

This helps track connection issues and server status.

---

## Key Features

### 1. Book Inventory Management

Full CRUD functionality for books.

Each book stores:

* Title
* Author
* Genre
* Publisher
* Price

Automatic timestamps track:

* `createdAt`
* `updatedAt`

---

### 2. User Membership System

Users can register and maintain subscriptions.

Supported subscription tiers:

* **Basic** → 90 days
* **Standard** → 180 days
* **Premium** → 365 days

---

### 3. Issued Book Tracking

The system tracks which books are issued to which users using MongoDB relationships:

issuedBook: ObjectId → Book

Mongoose `populate()` is used to fetch book details when required.

---

### 4. Automated Fine Calculation Engine

The system dynamically calculates fines based on:

* Subscription status
* Return date
* Current date

Rules:

* **Expired subscription + late book** → 100 units fine
* **Active subscription + late book** → 50 units fine

---

## API Reference

### User Endpoints

GET: `/users` -> List all users                         
GET: `/users/:id` -> Get user details           
POST: `/users` -> Register a new user                    
PUT: `/users/:id` -> Update user information                
DELETE: `/users/:id` -> Delete a user  
GET: `/users/subscription-details/:id` -> Calculate subscription status and fine

---

### Book Endpoints

GET: `/books` -> Get all books           
GET: `/books/:id` -> Get book by ID          
GET: `/books/issued/by-user` -> Get all issued books    
POST: `/books` -> Add new book            
PUT: `/books/:id` -> Update book information 

---

## API Testing

All APIs were tested using **Postman** to validate:

* Request handling
* Database operations
* Error responses
* Business logic

---
