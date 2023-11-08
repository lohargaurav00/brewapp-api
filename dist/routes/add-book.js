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
// @route   POST api/add-book
// @desc    Add a book
// @access  Public
router.post("/", [
    (0, express_validator_1.body)("title", "Title is required").notEmpty(),
    (0, express_validator_1.body)("author", "Author is required").notEmpty(),
    (0, express_validator_1.body)("summary", "Summary is required").notEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // If there are errors return Bad request and the errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, author, summary } = req.body;
        // if the book already exists return Bad request
        const isBookAlreadyExist = yield book_1.default.findOne({ title });
        if (isBookAlreadyExist) {
            return res.status(400).json({
                response: "error",
                message: "This book already exists",
            });
        }
        // Create a new book
        const book = yield book_1.default.create({
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
