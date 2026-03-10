# Library Management System (Backend)

A professional-grade Node.js and Express API designed for library inventory management. This system handles book tracking, user memberships, and features a dynamic fine-calculation engine based on subscription tiers.

---

## Tech Stack

* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB
* Object Modeling: Mongoose ODM
* Environment Management: Dotenv

---

## Architecture & Design Patterns

* MVC Pattern: Organized into dedicated folders for Models, Controllers, and Routes to ensure a clean separation of concerns.

* DTO (Data Transfer Object): Implements a `IssuedBook` DTO to flatten and transform complex database relationships into clean, frontend-friendly responses.

* Centralized Model Exports: Uses `models/index.js` to streamline imports across the application.

* Event-Driven DB Connection: Monitors MongoDB connection health using Mongoose event listeners (`on` and `once`).

---

## Key Features

### 1. Inventory Control

Full CRUD functionality for books, including tracking of titles, authors, genres, and publishers with automatic `createdAt` and `updatedAt` timestamps.

### 2. Subscription Management

Tracks user memberships with three distinct tiers:

* Basic: 90-day validity.
* Standard: 180-day validity.
* Premium: 365-day validity.

### 3. Automated Fine Engine

Dynamically calculates fines based on subscription status and book return dates:

* Expired Subscription + Late Book: 100 units.
* Active Subscription + Late Book: 50 units.

---

## API Reference

### User Endpoints

- GET: `/users` -> List all library members
- GET:  `/users/:id` -> Get specific user profile by ID
- POST: `/users` -> Register a new member
- PUT: `/users/:id` -> Update user information
- DELETE: `/users/:id` -> Remove a member
- GET: `/users/subscription-details/:id` -> Calculate fines & expiration status

### Book Endpoints

- GET: `/books` -> Retrieve all books
- GET: `/books/:id` -> Get book details by ID
- GET: `/books/issued/by-user` -> Get all books currently issued
- POST: `/books` -> Add a new book to the library
- PUT: `/books/updateBook/:id` -> Update book details by ID

---