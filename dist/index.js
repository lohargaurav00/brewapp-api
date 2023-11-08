"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = __importDefault(require("./db"));
//@Routes import
const add_book_1 = __importDefault(require("./routes/add-book"));
const view_all_books_1 = __importDefault(require("./routes/view-all-books"));
const find_book_1 = __importDefault(require("./routes/find-book"));
const update_book_1 = __importDefault(require("./routes/update-book"));
const delete_book_1 = __importDefault(require("./routes/delete-book"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to the Book API");
});
// @Routes
app.use("/api/add-book", add_book_1.default); // adds a book
app.use("/api/view-all-books", view_all_books_1.default); // returns list of all books
app.use("/api/find-book", find_book_1.default); // returns a list of books with a query id or title or author
app.use("/api/update-book", update_book_1.default); // updates a book with a param id and return response message
app.use("/api/delete-book", delete_book_1.default); // deletes a book with a param id and return response message
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
