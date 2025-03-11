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

## POST /api/captain/register

### Description
This endpoint registers a new captain. It validates the provided email, ensures the first name is at least 3 characters long, and the password is at least 6 characters long. Additionally, it validates vehicle data including color, plate number, capacity, and vehicle type. On success, it returns the captain data and a JWT token.

### Request Body
- **fullName** (object):
  - **firstName** (string, required): Minimum 3 characters.
  - **lastName** (string, required)
- **email** (string, required): Must be a valid email.
- **password** (string, required): Minimum 6 characters.
- **status** (string, optional)
- **vehicle** (object, required):
  - **color** (string, required): Minimum 3 characters.
  - **plate** (string, required): Minimum 4 characters.
  - **capacity** (number, required): At least 1.
  - **vehicleType** (string, required): Must be one of ['car', 'motorcycle', 'auto'].

Example:
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123",
  "status": "active",
  "vehicle": {
    "color": "red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response Status Codes
- **200 OK**: Captain registered successfully. Returns the captain data and a JWT token.
- **400 Bad Request**: Missing fields or validation errors.
- **500 Internal Server Error**: A server-side error occurred.

## POST /api/captain/login

### Description
Authenticates a captain using their email and password. On success, returns the captain data and a JWT token.

### Request Body
- **email** (string, required): Must be a valid email.
- **password** (string, required): Captain password.

Example:
```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

### Response Status Codes
- **200 OK**: Login successful. Returns the captain data and a JWT token.
- **400 Bad Request**: Missing fields or validation errors.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: A server-side error occurred.

## GET /api/captain/profile

### Description
Retrieves the authenticated captain's profile data.

### Response Status Codes
- **200 OK**: Returns the captain's profile data.
- **401 Unauthorized**: Captain is not authenticated.

### Example Response
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "status": "active",
  "vehicle": {
    "color": "red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## GET /api/captain/logout

### Description
Logs out the captain by clearing the authentication token cookie and blacklisting the token.

### Response Status Codes
- **200 OK**: Logout is successful.
- **500 Internal Server Error**: A server error occurred.
