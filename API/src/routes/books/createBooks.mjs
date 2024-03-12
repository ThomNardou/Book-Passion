import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const createBooksRouter = express();

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a book.
 *     description: Create a book.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Book object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             numberPages:
 *               type: integer
 *             excerpt:
 *               type: string
 *             summary:
 *               type: string
 *             writer:
 *               type: string
 *             editor:
 *               type: string
 *             releaseDate:
 *               type: integer
 *             avgRating:
 *               type: number
 *             imageLink:
 *               type: string
 *             fk_user:
 *               type: integer
 *             fk_category:
 *               type: integer
 *     responses:
 *       200:
 *         description: Create a book.
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
createBooksRouter.post("/", auth,(req, res) => {
  // Création d'un livre avec les données reçues
  Book.create(req.body)
    .then((createdBook) => {
      // Renvoie un message de succès
      const message = `The books ${createdBook.title} has indeed been created !`;
      res.json(success(message, createdBook));
    })
    // Si une erreur est survenue lors de la création du livre
    .catch((error) => {
      // Si l'erreur est une erreur de validation (400)
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      // Renvoie un message d'erreur (500)
      const message = "The book could not be added. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createBooksRouter };
