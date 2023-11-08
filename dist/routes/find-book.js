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
// @route   GET api/find-book
// @desc    find a book with a query id or title or author and return it
// @access  Public
router.get("/", (0, express_validator_1.oneOf)([
    (0, express_validator_1.query)("id", "Please enter a valid id").isMongoId(),
    (0, express_validator_1.query)("title", "Please enter a valid title").isString(),
    (0, express_validator_1.query)("author", "Please enter a valid author").isString(),
], {
    message: "Please enter a valid id or title or author",
    errorType: "least_errored",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If there are errors return Bad request and the errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, title, author } = req.query;
        // search for a book with the id or title or author
        const books = yield book_1.default.find(id ? { _id: id } : title ? { title } : { author });
        // if there are no books return Bad request
        if (books.length === 0) {
            return res.status(400).json({
                response: "error",
                message: `There are no books in the associated with this ${id ? "id: " + id : title ? "title: " + title : "author: " + author}`,
            });
        }
        // return the list of founded books
        res.status(200).json(books);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
