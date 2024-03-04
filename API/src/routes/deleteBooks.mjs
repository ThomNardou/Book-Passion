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
        if (deletedBook === null) {
            const message = "The requested book does not exist. Please try again with another login.";
            return res.status(404).json({ message });
        }

        return Book.destroy({
        where: { id: deletedBook.id },
        }).then((_) => {
        const message = `The book ${deletedBook.name} has been deleted!`;
        res.json(success(message, deletedBook));
        })
    }).catch((error) => {
        const message = "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
    })
});

export { deleteBooksRouter }