import { Router, Request, Response } from "express";
import { query, oneOf, validationResult } from "express-validator";

import Book from "../models/book";

const router = Router();

// @route   GET api/find-book
// @desc    find a book with a query id or title or author and return it
// @access  Public

router.get(
  "/",
  oneOf(
    [
      query("id", "Please enter a valid id").isMongoId(),
      query("title", "Please enter a valid title").isString(),
      query("author", "Please enter a valid author").isString(),
    ],
    {
      message: "Please enter a valid id or title or author",
      errorType: "least_errored",
    }
  ),
  async (req: Request, res: Response) => {
    try {
      // If there are errors return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, title, author } = req.query;

      // search for a book with the id or title or author
      const books = await Book.find(
        id ? { _id: id } : title ? { title } : { author }
      );

      // if there are no books return Bad request
      if (books.length === 0) {
        return res.status(400).json({
          response: "error",
          message: `There are no books in the associated with this ${
            id ? "id: " + id : title ? "title: " +  title : "author: "+ author
          }`,
        });
      }
      // return the list of founded books
      res.status(200).json(books);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
