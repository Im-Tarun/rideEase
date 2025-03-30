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

## GET /api/maps/get-coordinates

### Description
This endpoint retrieves the geographical coordinates (latitude and longitude) for a given address.

### Query Parameters
- **address** (string, required): The address to get coordinates for. Minimum length is 3 characters.

Example:
```
/api/maps/get-coordinates?address=New York
```

### Response Status Codes
- **200 OK**: Coordinates retrieved successfully.
- **400 Bad Request**: Validation errors with the address.
- **404 Not Found**: Internal server error occurred.

### Response Example
```json
{
  "lat": 40.712776,
  "lng": -74.005974
}
```

---

## GET /api/maps/get-distance-time

### Description
This endpoint calculates the distance and estimated travel time between two locations.

### Query Parameters
- **origin** (string, required): The starting location. Minimum length is 3 characters.
- **destination** (string, required): The destination location. Minimum length is 3 characters.

Example:
```
/api/maps/get-distance-time?origin=New York&destination=Los Angeles
```

### Response Status Codes
- **200 OK**: Distance and time calculated successfully.
- **400 Bad Request**: Validation errors with origin or destination.
- **500 Internal Server Error**: Unable to calculate distance and time.

### Response Example
```json
{
  "distance": {
    "text": "4,490 km",
    "value": 4490000
  },
  "duration": {
    "text": "41 hours",
    "value": 147600
  }
}
```

---

## GET /api/maps/get-suggestions

### Description
This endpoint provides location suggestions based on user input.

### Query Parameters
- **input** (string, required): The search input for suggestions. Minimum length is 1 character.

Example:
```
/api/maps/get-suggestions?input=New
```

### Response Status Codes
- **200 OK**: Suggestions retrieved successfully.
- **400 Bad Request**: Validation errors with the input.
- **500 Internal Server Error**: Unable to fetch suggestions.

### Response Example
```json
[
  {
    "description": "New York, NY, USA",
    "place_id": "ChIJOwg_06VPwokRYv534QaPC8g"
  },
  {
    "description": "Newark, NJ, USA",
    "place_id": "ChIJHQ6oX6xQwokRUCneD4z8AAU"
  }
]
```

---

## POST /api/ride/create

### Description
This endpoint creates a new ride request. It accepts fare details (previously calculated via /api/ride/get-fare). Note: In the response, the "duration" field represents the ride distance (in km) and the "distance" field represents the estimated travel time (in minutes).

### Request Body
- **pickUp** (string, required): The pick-up location. Minimum length is 3 characters.
- **destination** (string, required): The destination location. Minimum length is 3 characters.
- **vehicleType** (string, required): The type of vehicle. Must be one of `car`, `motorcycle`, or `auto`.
- **fare** (object, required): The fare details including:
  - **cost** (object):
    - **motorcycle** (number, required)
    - **auto** (number, required)
    - **car** (number, required)
  - **otherInfo** (object):
    - **distanceInKm** (number, required)
    - **timeInMin** (number, required)

Example:
```json
{
  "pickUp": "New York",
  "destination": "Los Angeles",
  "vehicleType": "car",
  "fare": {
    "cost": {
      "motorcycle": 1800.00,
      "auto": 3150.00,
      "car": 4050.00
    },
    "otherInfo": {
      "distanceInKm": 4490.0,
      "timeInMin": 2460.0
    }
  }
}
```

### Response Status Codes
- **200 OK**: Ride created successfully. Returns ride details.
- **400 Bad Request**: Validation errors with the request body.
- **500 Internal Server Error**: A server-side error occurred.

### Response Example
```json
{
  "user": "64f1c2e5b5d6c2a1f8e4d123",
  "pickUp": "New York",
  "destination": "Los Angeles",
  "duration": "4490.000",
  "distance": "2460.000",
  "fare": "4050.00",
  "otp": "174456",
  "_id": "64f1c2e5b5d6c2a1f8e4d456"
}
```

## POST /api/ride/confirm

### Description
This endpoint confirms a ride by assigning a captain to the ride and notifying the user via a socket event.

### Request Body
- **rideId** (string, required): A valid MongoDB ObjectId of the ride to be confirmed.

Example:
```json
{
  "rideId": "64f1c2e5b5d6c2a1f8e4d456"
}
```

### Response Status Codes
- **200 OK**: Ride confirmed successfully. Returns a message and the updated ride details.
- **400 Bad Request**: Validation errors such as an invalid rideId.
- **500 Internal Server Error**: A server-side error occurred.

## GET /api/ride/get-fare

### Description
This endpoint calculates the fare for a ride based on the pick-up and destination locations.

### Query Parameters
- **pickUp** (string, required): The pick-up location. Minimum length is 3 characters.
- **destination** (string, required): The destination location. Minimum length is 3 characters.

Example:
```
/api/ride/get-fare?pickUp=New York&destination=Los Angeles
```

### Response Status Codes
- **200 OK**: Fare calculated successfully.
- **400 Bad Request**: Validation errors with pick-up or destination.
- **500 Internal Server Error**: Unable to calculate fare.

### Response Example
```json
{
  "cost": {
    "motorcycle": "1800.00",
    "auto": "3150.00",
    "car": "4050.00"
  },
  "otherInfo": {
    "distanceInKm": 4490.0,
    "timeInMin": 2460.0
  }
}
```

## POST /api/ride/start

### Description
This endpoint starts a ride after verifying the provided OTP.

### Request Body
- **rideId** (string, required): A valid MongoDB ObjectId of the ride to be started.
- **otp** (string, required): A 6-digit OTP for ride verification.

Example:
```json
{
  "rideId": "64f1c2e5b5d6c2a1f8e4d456",
  "otp": "174456"
}
```

### Response Status Codes
- **200 OK**: Ride started successfully.
- **400 Bad Request**: Validation errors such as an invalid OTP or rideId.
- **500 Internal Server Error**: A server-side error occurred.

### Response Example
```json
{
  "message": "Ride has started successfully"
}
```

---

## POST /api/ride/end

### Description
This endpoint ends a ride and updates its status to "completed."

### Request Body
- **rideId** (string, required): A valid MongoDB ObjectId of the ride to be ended.

Example:
```json
{
  "rideId": "64f1c2e5b5d6c2a1f8e4d456"
}
```

### Response Status Codes
- **200 OK**: Ride ended successfully.
- **400 Bad Request**: Validation errors such as an invalid rideId.
- **500 Internal Server Error**: A server-side error occurred.

### Response Example
```json
{
  "message": "Ride has completed successfully"
}
```
