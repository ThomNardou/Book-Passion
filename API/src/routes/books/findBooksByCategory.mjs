import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { Book } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const categoryBooksRooter = express();

/**
 * @swagger
 * /api/books/category/:id/books:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books with a certain category.
 *     description: Retrieve all books with a certain category.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book's category
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: find a book with his category.
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
 *                   Category.id:
 *                     type: number
 *                     description: the id of the category.
 *                     example: 1
 *                   Category.name:
 *                     type: string
 *                     description: the name of the category.
 *                     example: Fantastic
 *
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
