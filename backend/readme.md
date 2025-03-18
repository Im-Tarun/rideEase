# API Documentation

## POST /api/user/register

### Description
This endpoint registers a new user. It validates the provided email, ensures the first name is at least 3 characters long, and the password is at least 6 characters long. On success, it returns the registered user data and a JWT token. 

### Request Body
- **fullName** (object):
  - **firstName** (string, required): Minimum 3 characters.
  - **lastName** (string, required)
- **emailId** (string, required): Must be a valid email.
- **password** (string, required): Minimum 6 characters.

Example:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "emailId": "john.doe@example.com",
  "password": "secret123"
}
```

### Response Status Codes
- **200 OK**: User registered successfully. Returns the user data and a JWT token.
- **400 Bad Request**: Missing fields or validation errors (invalid email, insufficient character lengths).
- **500 Internal Server Error**: A server-side error occurred.

## POST /api/user/login

### Description
This endpoint logs an existing user in by verifying the provided credentials. On success, it returns the user data and a JWT token.

### Request Body
- **email** (string, required): Must be a valid email.
- **password** (string, required): Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Response Status Codes
- **200 OK**: Login successful. Returns user data and a JWT token.
- **400 Bad Request**: Validation errors with email or password.
- **401 Unauthorized**: Email not registered or password does not match.
- **500 Internal Server Error**: A server-side error occurred.

### Response Example
```json
{
  "success": true,
  "mesaage": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields...
  },
  "token": "jwt_token_here"
}
``` 
