import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getBook, removeBook } from "./helper.mjs";

const deleteBooksRouter = express();

/**
 * @swagger
 * /api/books/remove/:id:
 *   delete:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book with it's id.
 *     description: Delete a book with it's id.
 *     responses:
 *       200:
 *         description: Delete a book with it's id.
 */
deleteBooksRouter.delete("/:id", (req, res) => {
    const bookId = req.params.id;
    const deletedBook = getBook(bookId);
    removeBook(bookId);

    const message = `The book ${deletedBook.title} has been deleted!`;

    res.json(success(message, deletedBook));
});

export { deleteBooksRouter }