import express from "express";
import { success } from "../helper.mjs";
import { ValidationError } from "sequelize";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

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
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Category's object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Create a cCategory.
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
createCategoryRouter.post("/", auth,(req, res) => {
  // Crée la catégorie 
  Category.create(req.body)
    .then((createCategory) => {
      // Si tout c'est bien passé
      const message = `The Category ${createCategory.name} has indeed been created !`;
      res.json(success(message, createCategory));
    })
    // Si une erreur se produit lors de la création de la catégorie
    .catch((error) => {
      // Si l'erreur est une erreur de validation
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      // Si l'erreur est une erreur serveur
      const message = "The Category could not be added. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createCategoryRouter };
