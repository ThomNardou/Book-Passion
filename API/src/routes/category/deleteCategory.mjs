import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const deleteCategoryRouter = express();

/**
 * @swagger
 * /api/category/:id:
 *   delete:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a Category with it's id.
 *     description: Delete a Category with it's id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete a book.
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
 *                   name:
 *                     type: string
 *                     description: The category's name.
 *                     example: Fantastic
 *
 */
deleteCategoryRouter.delete("/:id", auth, (req, res) => {
    // Chercher une catégorie à partir de son ID
    Category.findByPk(req.params.id).then((deletedCategory) => {
        // Regarde si elle a été trouvé
        if (deletedCategory === null) {
            // Renvoie l'erreur 
            const message = "The requested Category does not exist. Please try again with another login.";
            return res.status(404).json({ message });
        }

        // Supprime la catégorie 
        return Category.destroy({
            where: { id: deletedCategory.id },
        }).then((_) => {
            // Si tout c'est bien passé
            const message = `The Category ${deletedCategory.name} has been deleted!`;
            res.json(success(message, deletedCategory));
        })
            // Si une erreur c'est passé pendant la supression de la catégorie 
            .catch((error) => {
                // Renvoir un message d'erreur (500)
                const message = "The Category could not be deleted. Please try again in a few moments.";
                res.status(500).json({ message, data: error });
            })
    })
        // Si une erreur c'est passé pendant la recherche de la catégorie 
        .catch((error) => {
            // Renvoir un message d'erreur (500)
            const message = "The Category could not be deleted. Please try again in a few moments.";
            res.status(500).json({ message, data: error });
        })
});

export { deleteCategoryRouter }