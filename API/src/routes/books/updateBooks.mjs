import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const putBooksRooter = express();

/**
 * @swagger
 * /api/books/:id:
 *   put:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a book using it's id.
 *     description: Update a book using it's id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Book object that needs to be update  (as you wish)
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
 *         description: update a book with his id.
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
putBooksRooter.put("/:id", auth,(req, res) => {
    const bookId = req.params.id;
    // Met à jour le livre avec l'identifiant du livre
    Book.update(req.body, { where: { id: bookId } }).then((_) => {
        // Récupère le livre mis à jour
        Book.findByPk(bookId).then((updatedBook) => {
            // Si le livre mis à jour n'existe pas
            if (updatedBook === null) {
                // Retourne un message d'erreur
                const message = "The requested book does not exist. Please try again with another login.";
                return res.status(404).json({ message });
            }

            // Retourne un message de succès
            const message = `The book ${updatedBook.name} with id ${updatedBook.id} has been successfully updated`
            res.json(success(message, updatedBook));
        })
        // Si une erreur est survenue lors de la récupération du livre mis à jour
        .catch((error) => {
            // Retourne un message d'erreur
            const message = "The book could not be updated. Please try again shortly.";
            res.status(500).json({ message, data: error });
        })
    })
    // Si une erreur est survenue lors de la mise à jour du livre
    .catch((error) => {
        const message = "The book could not be updated. Please try again shortly.";
        res.status(500).json({ message, data: error });
    })
});

export { putBooksRooter };