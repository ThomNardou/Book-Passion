import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const idBooksRooter = express();

/**
 * @swagger
 * /api/books/:id:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a book using it's id.
 *     description: Retrieve a book using it's id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book
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
 *
 */
idBooksRooter.get("/:id", auth,(req, res) => {
  // Chercher un livre par son id
  Book.findByPk(req.params.id).then((book) => {
    // Si le livre n'existe pas
    if (book === null) {
      // Retourne un message d'erreur
      const message = "The requested book does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    // Retourne le livre trouvé
    const message = `The book with id ${book.id} has been retrieved.`;
    res.json(success(message, book));
  })
  // Si une erreur est survenue lors de la récupération du livre
  .catch((error) => {
    // Retourne un message d'erreur
    const message = "The book could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { idBooksRooter };