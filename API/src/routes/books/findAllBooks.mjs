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
 *         description: Retrieve all books.
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
