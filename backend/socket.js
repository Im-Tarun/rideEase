import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

// Initializes the socket using the provided HTTP server instance.
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // allow all origins, adjust as needed
      methods: ["GET", "POST"], 
    },
  });

  //connect to server
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    // update the db with socket it
    socket.on("join", async (data) => {
      const { userType, userId } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    // Update captain location every few sec
    socket.on("updateCapLoc", async(data) => {
      const { capId, latitude, longitude } = data;
      if ( !capId || !latitude || !longitude  ) {
        return socket.emit("error", { message: "Invalid data: capId and location are required.",
        });
      }
      try {
        // Update the captain's location in the database
        await captainModel.findByIdAndUpdate(capId, {
          location: {
            ltd: latitude,
            lng:longitude
          }
        });
        console.log(`Updated location for captain - ${capId}:`,{ latitude, longitude});
      } catch (error) {
        console.error("Error updating captain location:", error);
        socket.emit("error", { message: "Failed to update captain location." });
      } 

    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

// Sends a message to a specific socket id.
export const sendMessageToSocketId = (socketId, event, data) => {
  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.error("Socket.io has not been initialized.");
  }
};
