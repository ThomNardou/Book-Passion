import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";

const deleteBooksRouter = express();

/**
 * @swagger
 * /api/books/:id:
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
        const message = `The book ${deletedBook.title} has been deleted!`;
        res.json(success(message, deletedBook));
        })
    }).catch((error) => {
        const message = "The book could not be deleted. Please try again in a few moments.";
        res.status(500).json({ message, data: error });
    })
});

export { deleteBooksRouter }