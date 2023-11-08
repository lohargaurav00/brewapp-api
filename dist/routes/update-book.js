"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const book_1 = __importDefault(require("../models/book"));
const router = (0, express_1.Router)();
// @route   PATCH api/update-book
// @desc    update a book with a query id and return response message
// @access  Public
router.patch("/:id", (0, express_validator_1.param)("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Please enter a valid ID"), (0, express_validator_1.oneOf)([
    (0, express_validator_1.body)("title", "Please enter a valid title").isString(),
    (0, express_validator_1.body)("author", "Please enter a valid author").isString(),
    (0, express_validator_1.body)("description", "Please enter a valid description").isString(),
], {
    message: "Please enter a valid id or title or author",
    errorType: "least_errored",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // If there are errors return Bad request and the errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const { title, author, summary } = req.body;
        // search for a book with the id and update it
        const updatedBook = yield book_1.default.findByIdAndUpdate(id, { title, author, summary, updated_at: new Date() }, { new: true });
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
