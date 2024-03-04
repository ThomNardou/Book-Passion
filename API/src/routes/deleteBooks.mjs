import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getBook, removeBook } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const deleteBooksRouter = express();

/**
 * @swagger
 * /api/books/remove/:id:
 *   delete:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book with it's id.
 *     description: Delete a book with it's id.
 *     responses:
 *       200:
 *         description: Delete a book with it's id.
 */
deleteBooksRouter.delete("/:id", (req, res) => {
    Book.findByPk(req.params.id).then((deletedBook) => {
        Book.destroy({
        where: { id: deletedBook.id },
        }).then((_) => {
        // Définir un message pour le consommateur de l'API REST
        const message = `Le produit ${deletedBook.name} a bien été supprimé !`;
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, deletedBook));
        })
    })
});

export { deleteBooksRouter }