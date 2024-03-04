import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const putBooksRooter = express();

/**
 * @swagger
 * /api/books/category/title/:title:
 *   put:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Edit a book using it's title.
 *     description: Edit a book using it's title.
 *     responses:
 *       200:
 *         description: Edit a book using it's title.
 */
putBooksRooter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find((book) => book.id == bookId)

    const updatedBook = {
        id: bookId,
        ...req.body,
    }

    books = books.map((book) =>
        book.id == bookId ? updatedBook : book
    );

    const message = `The book with id ${bookId} has been retrieved.`;
    res.json(success(message, book));
});

export { putBooksRooter };