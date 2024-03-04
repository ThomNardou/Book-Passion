import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getUniqueId } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";

const createBooksRouter = express();

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a book.
 *     description: Create a book.
 *     responses:
 *       200:
 *         description: Create a book.
 */
createBooksRouter.post("/", (req, res) => {
  Book.create(req.body)
    .then((createdBook) => {
      const message = `The books ${createdBook.title} has indeed been created !`;
      res.json(success(message, createdBook));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      const message = "The book could not be added. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createBooksRouter };
