import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getBook } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const idBooksRooter = express();

/**
 * @swagger
 * /api/books/:id:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a book using it's id.
 *     description: Retrieve a book using it's id.
 *     responses:
 *       200:
 *         description: Retrieve a book using it's id.
 */
idBooksRooter.get("/:id", (req, res) => {
  Book.findByPk(req.params.id).then((book) => {
    if (book === null) {
      const message = "The requested product does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    const message = `The book with id ${req.params.id} has been retrieved.`;
    res.json(success(message, book));
  })
  .catch((error) => {
    const message = "The product could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { idBooksRooter };