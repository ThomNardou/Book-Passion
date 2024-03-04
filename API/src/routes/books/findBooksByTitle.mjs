import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";

const titleBooksRooter = express();

/**
 * @swagger
 * /api/books/title/:title:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a book using it's title.
 *     description: Retrieve a book using it's title.
 *     responses:
 *       200:
 *         description: Retrieve a book using it's title.
 */
titleBooksRooter.get("/:title", (req, res) => {
  const title = req.params.title

  Book.findOne({where: {title: title}}).then((book) => {
    if (book === null) {
      const message = "The requested book does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    const message = `The book with title ${book.title} has been retrieved.`;
    res.json(success(message, book));
  })
  .catch((error) => {
    const message = "The book could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { titleBooksRooter };