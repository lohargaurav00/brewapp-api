"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DbUrl = process.env.MONGO_DB_URL || "";
let connectionAttempts = 0;
function connectToDb() {
    mongoose_1.default
        .connect(DbUrl)
        .then(() => {
        console.log("Connected to database");
    })
        .catch((err) => {
        console.log("Error connecting to database", err.message);
        // If connection fails, try again after 5 seconds and limit the number of connection attempts to 1 
        if (connectionAttempts < 1) {
            setTimeout(() => {
                console.log("Attempting to reconnect...");
                connectToDb();
                connectionAttempts++;
            }, 5000);
        }
        else {
            console.log("Max connection attempts reached. Exiting...");
            process.exit(1);
        }
    });
}
exports.default = connectToDb;
