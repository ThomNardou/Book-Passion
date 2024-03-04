import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const putBooksRooter = express();

/**
 * @swagger
 * /api/books:
 *   put:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a book using it's id.
 *     description: Update a book using it's id.
 *     responses:
 *       200:
 *         description: Update a book using it's id.
 */
putBooksRooter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    Book.update(req.body, { where: { id: bookId } }).then((_) => {
        Book.findByPk(bookId).then((updatedBook) => {
            const message = `The book ${updatedBook.name} with id ${updatedBook.id} has been successfully updated`
            res.json(success(message, updatedBook));
        });
    });
});

export { putBooksRooter };