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
// @route   DELETE api/delete-book/:id
// @desc    Delete a book by id
// @access  Public
router.delete("/:id", (0, express_validator_1.param)("id")
    .exists()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Id is not valid"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const deletedBook = yield book_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
