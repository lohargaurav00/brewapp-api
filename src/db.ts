import mongoose from "mongoose";

const DbUrl = process.env.MONGO_DB_URL || "";

let connectionAttempts = 0;

export default function connectToDb() {
  mongoose
    .connect(DbUrl)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to database", err.message);

      // If connection fails, try again after 5 seconds and limit the number of connection attempts to 3
      if (connectionAttempts < 3) {
        setTimeout(() => {
          console.log("Attempting to reconnect...");
          connectToDb();
          connectionAttempts++;
        }, 5000);
      } else {
        console.log("Max connection attempts reached. Exiting...");
        process.exit(1);
      }
    });
}
