import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getBook, removeBook } from "./helper.mjs";

const deleteBooksRouter = express();

deleteBooksRouter.delete("/:id", (req, res) => {
    const bookId = req.params.id;
    const deletedBook = getBook(bookId);
    removeBook(bookId);

    const message = `The book ${deletedBook.title} has been deleted!`;

    res.json(success(message, deletedBook));
});

export { deleteBooksRouter }