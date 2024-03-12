import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const putCategoryRooter = express();

/**
 * @swagger
 * /api/category/:id:
 *   put:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a Category using it's id.
 *     description: Update a Category using it's id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to update
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Category object that needs to be update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
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
putCategoryRooter.put("/:id", auth,(req, res) => {
    const categoryId = req.params.id;
    // Mettre à jour la catégorie avec les données fournies et où l'identifiant correspond à categoryId
    Category.update(req.body, { where: { id: categoryId } }).then((_) => {
        // cherche la catégorie par son identifiant
        Category.findByPk(categoryId).then((updatedCategory) => {
            // Regarde si la catégorie existe
            if (updatedCategory === null) {
                // Renvoie l'erreur si elle existe pas 
                const message = "The requested Category does not exist. Please try again with another login.";
                return res.status(404).json({ message });
            }

            // Si la catégorie est trouvée
            const message = `The Category ${updatedCategory.name} with id ${updatedCategory.id} has been successfully updated`
            res.json(success(message, updatedCategory));
        })
        .catch((error) => {
            const message = "The Category could not be updated. Please try again shortly.";
            res.status(500).json({ message, data: error });
        })
    })
    // Si une erreur se produit lors de la recherche de la catégorie
    .catch((error) => {
        const message = "The Category could not be updated. Please try again shortly.";
        res.status(500).json({ message, data: error });
    })
});

export { putCategoryRooter };