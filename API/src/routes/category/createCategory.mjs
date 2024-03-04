import express from "express";
import { success, getUniqueId } from "../helper.mjs";
import { ValidationError } from "sequelize";
import { Category } from "../../db/sequelize.mjs";

const createCategoryRouter = express();

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a Category.
 *     description: Create a Category.
 *     responses:
 *       200:
 *         description: Create a Category.
 */
createCategoryRouter.post("/", (req, res) => {
  Category.create(req.body)
    .then((createCategory) => {
      const message = `The Category ${createCategory.name} has indeed been created !`;
      res.json(success(message, createCategory));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      const message = "The Category could not be added. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createCategoryRouter };
