import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getUniqueId } from "./helper.mjs";
import swaggerUi from "swagger-ui-express";

const createBooksRouter = express();

/**
 * @swagger
 * /api/books/:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books.
 *     description: Retrieve all books.
 *     responses:
 *       200:
 *         description: Retrieve all books.
 */
createBooksRouter.post("/", (req, res) => {
    const id = getUniqueId(books);
    const createdBooks = { ...req.body, ...{ id: id } };
    books.push(createdBooks);
    const message = `The books ${createdBooks.title} has indeed been created !`;
    res.json(success(message, createdBooks));
})

export { createBooksRouter };