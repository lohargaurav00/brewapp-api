import { Router, Request, Response } from "express";
import { body, oneOf, param, validationResult } from "express-validator";

import Book from "../models/book";

const router = Router();

// @route   PATCH api/update-book
// @desc    update a book with a query id and return response message
// @access  Public

router.patch(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Please enter a valid ID"),
  oneOf(
    [
      body("title", "Please enter a valid title").isString(),
      body("author", "Please enter a valid author").isString(),
      body("description", "Please enter a valid description").isString(),
    ],
    {
      message: "Please enter a valid id or title or author",
      errorType: "least_errored",
    }
  ),
  async (req: Request, res: Response) => {
    // If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { title, author, summary } = req.body;

      // search for a book with the id and update it
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, summary, updated_at: new Date() },
        { new: true }
      );

      // if there is no books return Bad request
      if (!updatedBook) {
        return res.status(400).json({
          response: "error",
          message: "There is no book associated with this" + id,
        });
      }

      // return the success message and the updated book
      res.status(200).json({
        response: "success",
        message: "Book updated successfully",
        updatedBook,
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
