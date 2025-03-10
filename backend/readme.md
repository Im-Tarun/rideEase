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
Authenticates a user using their email and password. On success, returns the user data and a JWT token.

### Request Body
- **email** (string, required): Must be a valid email.
- **password** (string, required): User password.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Response Status Codes
- **200 OK**: Login successful. Returns the user data and a JWT token.
- **400 Bad Request**: Missing fields or validation errors.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: A server error occurred.

## GET /api/user/profile

### Description
Retrieves the authenticated user's profile data.

### Response Status Codes
- **200 OK**: Returns the user's profile data.
- **401 Unauthorized**: User is not authenticated.

### Example Response
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "emailId": "john.doe@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

## POST /api/user/logout

### Description
Logs out the user by clearing the authentication token cookie and blacklisting the token.

### Response Status Codes
- **200 OK**: Logout is successful.
- **500 Internal Server Error**: A server error occurred.
