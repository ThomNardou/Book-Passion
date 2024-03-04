import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const titleBooksRooter = express();

/**
 * @swagger
 * /api/books/category/title/:title:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a book using it's title.
 *     description: Retrieve a book using it's title.
 *     responses:
 *       200:
 *         description: Retrieve a book using it's title.
 */
titleBooksRooter.get("/:title", (req, res) => {
  const bookTitle = req.params.title;
  const book = books.find((book) => book.title == bookTitle)
  const message = `The book with the title ${bookTitle} has been successfully retrieved.`;
  res.json(success(message, book));
});

export { titleBooksRooter };