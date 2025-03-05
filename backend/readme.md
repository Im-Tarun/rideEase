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

<!-- ...existing documentation if any... -->
