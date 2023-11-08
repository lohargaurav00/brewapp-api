import mongoose from "mongoose";

const DbUrl = process.env.MONGO_DB_URL || ''

export default function connectToDb() {
    mongoose.connect(DbUrl).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Error connecting to database", err.message);
    })
}