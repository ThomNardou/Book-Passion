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
    const message = `Le livre dont l'id vaut ${req.params.id} a bien été récupéré.`;
    res.json(success(message, book));
  });
});

export { idBooksRooter };