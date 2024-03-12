import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const idCategoryRooter = express();

/**
 * @swagger
 * /api/categories/1:
 *   get:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a category using it's id.
 *     description: Retrieve a category using it's id.
 *     responses:
 *       200:
 *         description: Retrieve a category using it's id.
 */
idCategoryRooter.get("/:id", auth,(req, res) => {
  Category.findByPk(req.params.id).then((category) => {
    if (category === null) {
      const message = "The requested category does not exist. Please try again with another login.";
      return res.status(404).json({ message });
    }

    const message = `The category with id ${category.id} has been retrieved.`;
    res.json(success(message, category));
  })
  .catch((error) => {
    const message = "The category could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { idCategoryRooter };