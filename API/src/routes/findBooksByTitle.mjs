import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const titleBooksRooter = express();

/**
 * @swagger
 * /api/books/title/:title:
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
  Book.findByPk(req.params.title).then((book) => {
    const message = `The book with title ${req.params.title} has been retrieved.`;
    res.json(success(message, book));
  });
});

export { titleBooksRooter };