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
allCategoryRooter.get("/", auth,(req, res) => {
    Category.findAll()
    .then((category) => {
      const message = "The Category list has been retrieved.";
      res.json(success(message, category));
    })
    .catch((error) => {
      const message =
        "The Category list could not be retrieved. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { allCategoryRooter };