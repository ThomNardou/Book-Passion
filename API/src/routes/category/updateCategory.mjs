import express from "express";
import { books } from "../../db/mock-books.mjs";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";

const putCategoryRooter = express();

/**
 * @swagger
 * /api/category/:id:
 *   put:
 *     tags: [BooCategoryks]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a Category using it's id.
 *     description: Update a Category using it's id.
 *     responses:
 *       200:
 *         description: Update a Category using it's id.
 */
putCategoryRooter.put("/:id", (req, res) => {
    const categoryId = req.params.id;
    Category.update(req.body, { where: { id: categoryId } }).then((_) => {
        Category.findByPk(categoryId).then((updatedCategory) => {
            if (updatedCategory === null) {
                const message = "The requested Category does not exist. Please try again with another login.";
                return res.status(404).json({ message });
            }

            const message = `The Category ${updatedCategory.name} with id ${updatedCategory.id} has been successfully updated`
            res.json(success(message, updatedCategory));
        })
        .catch((error) => {
            const message = "The Category could not be updated. Please try again shortly.";
            res.status(500).json({ message, data: error });
        })
    })
    .catch((error) => {
        const message = "The Category could not be updated. Please try again shortly.";
        res.status(500).json({ message, data: error });
    })
});

export { putCategoryRooter };