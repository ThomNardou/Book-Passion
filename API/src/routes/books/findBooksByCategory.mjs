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
categoryBooksRooter.get("/:id/books", auth, (req, res) => {
  const bookCategory = req.params.id;

  Category.findByPk(bookCategory)
    .then((category) => {
      // Si la catégorie n'existe pas
      if (!category) {
        // Retourne un message d'erreur (404)
        const message = `The category with id ${bookCategory} does not exist.`;
        return res.status(404).json({ message });
      }

      // Cherche les livres avec la catégorie demandée et compte le nombre de résultats
      Book.findAndCountAll({
        include: {
          model: Category,
          as: "Categ",
          required: true,
          attributes: ["id", "name"],
          where: {
            id: { [Op.eq]: bookCategory },
          },
        },
      })
        .then((categorybook) => {
          // Si aucun livre n'est trouvé
          if (categorybook.count == 0) {
            // Retourne un message d'erreur (404)
            const message = `No books with category ${bookCategory} have been found.`;
            return res.status(200).json({ message });
          }

          // Retourne les livres trouvés
          const message = `The books with category ${bookCategory} have been retrieved.`;
          res.json(success(message, categorybook));
        })
        // Si une erreur est survenue lors de la récupération des livres
        .catch((error) => {
          // Retourne un message d'erreur (500)
          const message =
            "The books could not be recovered. Please try again shortly.";
          res.status(500).json({ message, data: error });
        });
    })
    // Si une erreur est survenue lors de la récupération de la catégorie
    .catch((error) => {
      // Retourne un message d'erreur (500)
      const message =
        "The category could not be recovered. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { categoryBooksRooter };
