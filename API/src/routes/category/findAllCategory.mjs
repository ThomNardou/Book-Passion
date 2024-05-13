import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const allCategoryRooter = express();

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all Category.
 *     description: Retrieve all Category.
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
allCategoryRooter.get("/", (req, res) => {
  if (req.query.order) {
    // Cherche toutes le catégories
    Category.findAndCountAll({
      order: [req.query.order]
    })
      .then((category) => {
        // Regarde si il y a des catégories
        if (category.count === 0) {
          // Renvoie le message d'erreur (404)
          const message = "There are no categories registered.";
          return res.status(200).json({ message });
        }

        // Renvoie la liste
        const message = "The Category list has been retrieved.";
        res.json(success(message, category));
      })
      // Si une erreur se produit lors de la recherche des catégories
      .catch((error) => {
        // Renvoie le message d'erreur (500)
        const message =
          "The Category list could not be retrieved. Please try again shortly.";
        res.status(500).json({ message, data: error });
      });


  } else {
    // Cherche toutes le catégories
    Category.findAndCountAll()
      .then((category) => {
        // Regarde si il y a des catégories
        if (category.count === 0) {
          // Renvoie le message d'erreur (404)
          const message = "There are no categories registered.";
          return res.status(200).json({ message });
        }

        // Renvoie la liste
        const message = "The Category list has been retrieved.";
        res.json(success(message, category));
      })
      // Si une erreur se produit lors de la recherche des catégories
      .catch((error) => {
        // Renvoie le message d'erreur (500)
        const message =
          "The Category list could not be retrieved. Please try again shortly.";
        res.status(500).json({ message, data: error });
      });
  }
});

export { allCategoryRooter };
