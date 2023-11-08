import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import Book from "../models/book";

const router = Router();

// @route   POST api/add-book
// @desc    Add a book
// @access  Public

router.post(
  "/",
  [
    body("title", "Title is required").notEmpty(),
    body("author", "Author is required").notEmpty(),
    body("summary", "Summary is required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    // If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, author, summary } = req.body;
      
      // if the book already exists return Bad request
      const isBookAlreadyExist = await Book.findOne({ title });
      if (isBookAlreadyExist) {
        return res.status(400).json({
          response: "error",
          message: "This book already exists",
        });
      }

      // Create a new book
      const book = await Book.create({
        title,
        author,
        summary,
        created_at: new Date(),
      });
      book
        .save()
        .then(() => {
          res.json({
            response: "success",
            message: "Your book has been added successfully",
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.json({
            response: "error",
            message: "Sorry, your book could not be added",
          });
        });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
