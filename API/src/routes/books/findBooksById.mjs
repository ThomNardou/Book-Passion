import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

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
idBooksRooter.get("/:id", auth,(req, res) => {
  Book.findByPk(req.params.id).then((book) => {
    if (book === null) {
      const message = "The requested book does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    const message = `The book with id ${book.id} has been retrieved.`;
    res.json(success(message, book));
  })
  .catch((error) => {
    const message = "The book could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { idBooksRooter };