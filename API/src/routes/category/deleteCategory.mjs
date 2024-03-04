import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";

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
 *     responses:
 *       200:
 *         description: Delete a Category with it's id.
 */
deleteCategoryRouter.delete("/:id", (req, res) => {
    Category.findByPk(req.params.id).then((deletedCategory) => {
        if (deletedCategory === null) {
            const message = "The requested Category does not exist. Please try again with another login.";
            return res.status(404).json({ message });
        }

        return Category.destroy({
        where: { id: deletedCategory.id },
        }).then((_) => {
        const message = `The Category ${deletedCategory.name} has been deleted!`;
        res.json(success(message, deletedCategory));
        })
    }).catch((error) => {
        const message = "The Category could not be deleted. Please try again in a few moments.";
        res.status(500).json({ message, data: error });
    })
});

export { deleteCategoryRouter }