import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const idCategoryRooter = express();

/**
 * @swagger
 * /api/categories/:id:
 *   get:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a category using it's id.
 *     description: Retrieve a category using it's id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to find
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: retrive all categories.
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
idCategoryRooter.get("/:id", auth,(req, res) => {
  // Recherche de la catégorie par son identifiant fourni en param
  Category.findByPk(req.params.id).then((category) => {
    // Regarde si il existe
    if (category === null) {
      // Renvoie l'erreur
      const message = "The requested category does not exist. Please try again with another ID.";
      return res.status(404).json({ message });
    }

    // Si la catégorie existe
    const message = `The category with id ${category.id} has been retrieved.`;
    res.json(success(message, category));
  })
  // Si une erreur se produit lors de la recherche de la catégorie
  .catch((error) => {
    // Renvoie le message d'erreur (500)
    const message = "The category could not be recovered. Please try again shortly.";
    res.status(500).json({ message, data: error });
  })
});

export { idCategoryRooter };