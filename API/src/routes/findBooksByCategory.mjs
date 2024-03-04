import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";
import { Category } from "../db/sequelize.mjs";
import { Op } from "sequelize";
import { Book } from "../db/sequelize.mjs";

const categoryBooksRooter = express();

/**
 * @swagger
 * /api/books/category/:category:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books with a certain category.
 *     description: Retrieve all books with a certain category.
 *     responses:
 *       200:
 *         description: Retrieve all books with a certain category.
 */
categoryBooksRooter.get("/:category", (req, res) => {
  const bookCategory = req.params.category;

  Book.findAll({
    include: {
      model: Category,
      require: true,
      attributes: ["name"],
      as: 'test',
    },
  }).then((categorybook) => {
    const message = `The books with category ${bookCategory} have been retrieved.`;
    res.json(success(message, categorybook));
  });
});

export { categoryBooksRooter };
