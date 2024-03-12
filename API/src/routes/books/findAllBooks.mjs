import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const allBooksRooter = express();

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books.
 *     description: Retrieve all books.
 *     responses:
 *       200:
 *         description: Retrieve all book.
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
 *                     description: The book ID.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The book's title.
 *                     example: Harry Potter
 *                   numberPages:
 *                     type: number
 *                     description: the number of pages in the book.
 *                     example: 539
 *                   excerpt:
 *                     type: string
 *                     description: An extract of the book.
 *                     example: Lorem Ipsum
 *                   summary:
 *                     type: string
 *                     description: the book summary.
 *                     example: Lorem Ipsum
 *                   writer:
 *                     type: string
 *                     description: the book's author.
 *                     example: J.K rollings
 *                   editor:
 *                     type: string
 *                     description: the book's editor.
 *                     example: Bloomsbury Publishing
 *                   releaseDate:
 *                     type: number
 *                     description: year of book release.
 *                     example: 2024
 *                   avgRating:
 *                     type: float
 *                     description: the average rating given by users.
 *                     example: 4.2
 *                   imageLink:
 *                     type: string
 *                     description: a link to the book cover image.
 *                     example: https://exemple.com/image.png
 *                   fk_user:
 *                     type: number
 *                     description: the identifier of the user who receives the book.
 *                     example: 1
 *                   fk_category:
 *                     type: number
 *                     description: the identifier of book's category.
 *                     example: 1
 *
 */
allBooksRooter.get("/", auth,(req, res) => {
  if (req.query.title) {
    if (req.query.title.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }

    return Book.findAll({
      where: { title: { [Op.like]: `%${req.query.title}%` } },
      order: ["title"],
    }).then((books) => {
      const message = "The book list has been retrieved.";
      res.json(success(message, books));
    });
  }

  Book.findAll()
    .then((books) => {
      const message = "The book list has been retrieved.";
      res.json(success(message, books));
    })
    .catch((error) => {
      const message =
        "The book list could not be retrieved. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { allBooksRooter };
