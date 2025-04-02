# RideEase Project Documentation

## Overview
RideEase is a full-stack MERN application mimicking ride-hailing services. The project is divided into two main parts:
- **Frontend**: Built with React (Vite) and TailwindCSS, handling UI for both users and captains.
- **Backend**: Built with Express, MongoDB (via Mongoose), and Socket.IO for real‑time ride notifications and management.

## Features
- **User Registration & Login:** Secure authentication for users.
- **Captain Registration & Login:** Separate flow for drivers with vehicle details.
- **Ride Management:** Users request rides, get fare estimates, and rides are created. Captains receive real‑time ride notifications and can accept, start, and complete rides.
- **Maps Integration:** Uses OpenStreetMap/Nominatim and OSRM for geocoding and calculating distance/time.
- **Socket Communication:** Real‑time event-based updates (new ride, ride accepted, ride started, ride completed).

## Project Structure
```
rideEase/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   └── vite.config.js
├── package.json
└── readme.md  <-- This file
```

## Setup Instructions

1. **Clone the Repository**
   - Clone the project into your local machine.

2. **Install Dependencies (For Development Only)**
   - For development environment:
     - For the backend, run:
       ```
       npm install
       ```
     - For the frontend, run:
       ```
       cd frontend
       npm install
       ```
   - For production, the dependencies are assumed to be bundled, so npm install is not required.

3. **Environment Setup**
   - Create a `.env` file in the `backend` folder with the required environment variables (PORT, MONGODB connection URI, JWT secret, and optionally GOOGLE_MAPS_API_KEY).

4. **Running the Application**
   - **Development Mode:**
      - Run the backend using:
      ```
      npm run dev
      ```
      - Run the frontend using:
       ```
       cd frontend
       npm run dev
       ```
   - **Production Mode:**
     - Build the frontend and install node modules:
     ```
     npm run build
     ```
     - Start the server with:
     ```
     npm run start
     ```

## API Documentation

Refer to the individual API documentation in the backend `backend/readme.md` for endpoints under:
- `/api/user`
- `/api/captain`
- `/api/ride`
- `/api/maps`

## Socket Events

### Client Events
- **join**: Associates a user or captain with the socket.
- **updateCapLoc**: Sends captain’s location updates.

### Server Events
- **new-ride**: Notifies nearby captains about a new ride.
- **ride-accepted**: Notifies the user that a captain has accepted the ride.
- **ride-started**: Notifies that the ride has been initiated.
- **ride-completed**: Notifies that the ride has been completed.

## Notes
- Ensure proper configuration of environment variables.
- For maps and location services, the app leverages OpenStreetMap and OSRM.
- The project uses standard REST APIs for ride management and Socket.IO for real‑time notifications.

## Credits
RideEase is inspired by popular ride‑hailing applications and is designed to showcase full‑stack real‑time application development using the MERN stack.

Happy Coding!
