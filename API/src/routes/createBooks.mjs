import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getUniqueId } from "./helper.mjs";

const createBooksRouter = express();

createBooksRouter.post("/", (req, res) => {
    const id = getUniqueId(books);
    const createdBooks = { ...req.body, ...{ id: id} };
    books.push(createdBooks);
    const message = `The books ${createdBooks.title} has indeed been created !`;
    res.json(success(message, createdBooks));
    })

export { createBooksRouter };