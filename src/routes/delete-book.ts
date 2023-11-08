import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";

import Book from "../models/book";

const router = Router();

// @route   DELETE api/delete-book/:id
// @desc    Delete a book by id
// @access  Public

router.delete(
  "/:id",
  param("id")
    .exists()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Id is not valid"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;

      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(400).json({
          response: "error",
          message: `There is no book associated with the id : ${id}`,
        });
      }

      res.status(200).json({
        response: "success",
        message: `The book with the id : ${id} has been deleted successfully`,
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
