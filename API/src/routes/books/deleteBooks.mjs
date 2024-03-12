import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const deleteBooksRouter = express();

/**
 * @swagger
 * /api/books/:id:
 *   delete:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: delete a book.
 *     description: delete a book.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: delete a book.
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
deleteBooksRouter.delete("/:id", auth,(req, res) => {
    // Chercher le livre par son id
    Book.findByPk(req.params.id).then((deletedBook) => {
        // Si le livre n'existe pas
        if (deletedBook === null) {
            // renvoie un message d'erreur
            const message = "The requested book does not exist. Please try again with another login.";
            return res.status(404).json({ message });
        }

        // Supprime le livre avec l'identifiant du livre
        return Book.destroy({
        where: { id: deletedBook.id },
        }).then((_) => {
        // Renvoie un message de succès
        const message = `The book ${deletedBook.title} has been deleted!`;
        res.json(success(message, deletedBook));
        })
    }).catch((error) => {
        // Renvoie un message d'erreur
        const message = "The book could not be deleted. Please try again in a few moments.";
        res.status(500).json({ message, data: error });
    })
});

export { deleteBooksRouter }