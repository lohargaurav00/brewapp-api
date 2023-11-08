import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";

import connectToDb from "./db";

//@Routes import
import addBook from "./routes/add-book";
import viewAllBooks from "./routes/view-all-books";
import findBook from "./routes/find-book";

const port = process.env.PORT || 5000;
const app = express();

connectToDb();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Book API");
});

// @Routes
app.use("/api/add-book", addBook); // adds a book
app.use("/api/view-all-books", viewAllBooks); // returns list of all books
app.use("/api/find-book", findBook); // returns a list of books with a query id or title or author

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
