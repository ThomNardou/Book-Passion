import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const putBooksRooter = express();

putBooksRooter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find((book) => book.id == bookId)

    const updatedBook = {
        id: bookId,
        ...req.body,
    }

    books = books.map((product) =>
        book.id == bookId ? updatedBook : book
    );

    const message = `Le livre dont l'id vaut ${bookId} a bien été récupéré.`;
    res.json(success(message, book));
});

export { putBooksRooter };