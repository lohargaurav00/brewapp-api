import mongoose from "mongoose";

const AddBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updated_at: {
        type: Date,
        default: "-",
        required: false,
    },
});

const Book = mongoose.model("book", AddBookSchema);
export default Book;
