import { Router, Request, Response } from "express";

import Book from "../models/book";

const router = Router();

// @route   GET api/view-all-books
// @desc    List all books
// @access  Public

router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    if(books.length === 0) {
        return res.status(400).json({
            response: "error",
            message: "There are no books in the database",
        });
    }
    res.status(200).json(books);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
