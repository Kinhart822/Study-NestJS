# NestJS Fundamentals Study Project

This project is a self-learning NestJS project designed to demonstrate core concepts, architectural patterns, and best practices in building scalable server-side applications with Node.js.

## 🚀 Project Overview

The application serves as a practical example of a backend system, featuring:

- **Modular Architecture**: Clean separation of concepts using NestJS modules.
- **Authentication & Security**: Implementation of JWT-based authentication, local strategies, and protected routes using Guards.
- **Database Integration**: Robust data persistence using PostgreSQL and TypeORM with transaction support.
- **Validation & Error Handling**: Global validation pipelines and centralized exception filtering.
- **Logging**: Advanced logging configuration using Winston.

## 🛠 Technology Stack

- **Core Framework**: [NestJS](https://nestjs.com/) (v11)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM (v0.3)
- **Authentication**: Passport, JWT, Bcrypt
- **Validation**: class-validator, class-transformer
- **Logging**: nest-winston, winston
- **Configuration**: dotenv, @nestjs/config

## 🏗 Key Concepts & Features

### 1. Modular Design

The application is structured into domain-specific modules:

- **AuthModule**: Handles user login, registration, and token generation.
- **UserModule**: Manages user profiles and data.
- **ProductsModule**: (Business Logic) Management of products/items.
- **PhoneModule**: (Business Logic) Additional domain feature.

### 2. Authentication & Authorization

- **Strategies**: Implements `LocalStrategy` for username/password login and `JwtStrategy` for token verification.
- **Guards**: Custom guards (`JwtAuthGuard`, `LocalAuthGuard`) to protect endpoints.
- **Hashing**: Secure password hashing using `bcrypt`.

### 3. Global Filters & Pipes

- **AllExceptionFilter**: A global filter that catches all HTTP exceptions and returns a consistent error response format.
- **ValidationPipe**: Global pipe configured in `main.ts` to automatically validate incoming request DTOs, stripping unknown properties and returning detailed error messages.

### 4. Database & Transactions

- **TypeORM Config**: Centralized database configuration.
- **Transactional**: Uses `typeorm-transactional` for declarative transaction management.
- **Migrations**: Setup for handling database schema changes.

### 5. Logging

- **Winston Logger**: Integrated for structured logging, providing better insights into application behavior and errors.

## 📂 Project Structure

```
src/
├── configs/        # Configuration files (Database, App config)
├── database/       # Database related setup
├── guards/         # Auth guards (JWT, Local)
├── middleware/     # Custom Middleware (Logging, etc.)
├── modules/        # Feature Modules (Auth, User, Products, etc.)
│   ├── auth/
│   ├── user/
│   ├── products/
│   └── ...
├── exceptions/     # Global filters
├── logger/         # Logger setup
└── main.ts         # Application entry point
```
