import express from "express";
import {books} from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const allBooksRooter = express();

/**
 * @swagger
 * /api/products/:
 *   get:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all products.
 *     description: Retrieve all products. Can be used to populate a select HTML tag.
 *     responses:
 *       200:
 *         description: All products.
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
 *
 */
allBooksRooter.get("/", (req, res) => {
    const message = "The book list has been retrieved.";
    res.json(success(message, books));
  });

export { allBooksRooter };