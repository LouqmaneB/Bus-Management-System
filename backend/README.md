# Backend – Bus Management App

This backend provides a REST API for the Bus Management App.
It handles authentication, users, bus routes, stops, and related business logic.
The API is consumed by the web frontend and is designed to be reusable for future applications (e.g. mobile or admin dashboard).

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-blue)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## Project Structure

The backend follows a modular and scalable structure:
```
/
  server.js
  /modules
    /auth
    /user
    /route
    /stop
    /bus
  /middleware
  /utils
  /logs
  /config
```

This structure helps keep responsibilities separated and makes the project easier to maintain and extend.

---

## API Overview

The API is organized into the following main areas:

- **Authentication**
  - User login and registration
  - JWT-based authentication
  - Role-based access control

- **Users**
  - User management
  - Role handling

- **Routes**
  - Bus route management
  - Route details with related stops

- **Stops**
  - Bus stop management
  - Stop–route relationships

---

## Running the Backend

### 1. Install dependencies

```bash
npm install
```
### 2. Environment variables

```bash
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
### 3. Start the server

```bash
npm start
```
The API will be available at:
```
http://localhost:5000
```

## Security
- JWT-based authentication

- Role-based authorization (e.g. admin, user)
- Protected routes using middleware

## Notes

- This backend is designed to be API-first

- The admin panel and analytics features may be separated into independent applications in the future
- The structure allows easy extension with new modules and services

## Author

Louqmane Bamousse

GitHub: [https://github.com/LouqmaneB](https://github.com/LouqmaneB)