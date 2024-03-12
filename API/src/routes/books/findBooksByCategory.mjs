import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { Book } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const categoryBooksRooter = express();

/**
 * @swagger
 * /api/books/category/:id:
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
categoryBooksRooter.get("/:id/books", auth,(req, res) => {
  const bookCategory = req.params.id;

  Book.findAll({
    include: {
      model: Category,
      require: true,
      attributes: ["id", "name"],
      as: 'Category',
      where: {
        id: {[Op.eq]: bookCategory}
      }
    },
  }).then((categorybook) => {
    if (categorybook === null) {
      const message = "The requested books does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    const message = `The books with category ${bookCategory} have been retrieved.`;
    res.json(success(message, categorybook));
  })
  .catch((error) => {
    const message = "The books could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { categoryBooksRooter };
