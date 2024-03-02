import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getUniqueId } from "./helper.mjs";
import swaggerUi from "swagger-ui-express";

const createBooksRouter = express();

/**
 * @swagger
 * /api/books/:
 *   get:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all products.
 *     description: Retrieve all products. Can be used to populate a select HTML tag.
 *     responses:
 *       200:
 *         description: All books.
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The product's name.
 *                     example: Big Mac
 *                   price:
 *                     type: number
 *                     description: The product's price.
 *                     example: 5.99
 */
createBooksRouter.post("/", (req, res) => {
    const id = getUniqueId(books);
    const createdBooks = { ...req.body, ...{ id: id } };
    books.push(createdBooks);
    const message = `The books ${createdBooks.title} has indeed been created !`;
    res.json(success(message, createdBooks));
})

export { createBooksRouter };