import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const categoryBooksRooter = express();

/**
 * @swagger
 * /api/books/category/:category:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books with a certain category.
 *     description: Retrieve all books with a certain category.
 *     responses:
 *       200:
 *         description: Retrieve all books with a certain category.
 */
categoryBooksRooter.get("/:category", (req, res) => {
  const bookCategory = req.params.category;
  const categorybook = books.filter((book) => book.category == bookCategory);
  const message = `The books with category ${bookCategory} have been retrieved.`;
  res.json(success(message, categorybook));
});

export { categoryBooksRooter };