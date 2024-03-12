import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();


/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Login]
 *     security:
 *       - bearerAuth: []
 *     summary: Give a token to the user to connect to the API.
 *     description: Give a token to the user to connect to the API.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User object that needs to be login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Give the token.
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
 *                   username:
 *                     type: string
 *                     description: the username.
 *                     example: etml
 *                   password:
 *                     type: string
 *                     description: the user's password crypted.
 *                     example: $2b$10$GRxGKtFcz47fI.4/bT6hyuuMHPthqHZQQOtecnY5dzZFy7VOomw0u
 *                   nbrBookRecommended:
 *                     type: number
 *                     description: the number of books the user has recommended .
 *                     example: 5
 *                   nbrRatingDone:
 *                     type: string
 *                     description: the number of books noted by the user.
 *                     example: 5
 *                   nbrCommentsDone:
 *                     type: number
 *                     description: the number of comments done by the user.
 *                     example: 2
 *                   token:
 *                     type: string
 *                     description: the user token.
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMDI4MDkzOCwiZXhwIjoxNzQxODM4NTM4fQ.2dyNunUEFO5E9qctmJTjMIP36l9UVtLgrrykCfilYE4
 *
 */
loginRouter.post("/", (req, res) => {
  // Cherche un utilisateur qui a le même nom dans le base de données que celui rentré en param
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      // Regarde si l'utilisateur exists
      if (!user) {
        // renvoie le message d'erreur si il n'existe pas (404)
        const message = `Requested user does not exist`;
        return res.status(404).json({ message });
      }
      bcrypt
        // Compare le mot de passe cryptée avec celui qui est rentré en params
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          // Regard esi le mot de passe est le bon
          if (!isPasswordValid) {
            // Renvoie l'erreur
            const message = `The password is incorrect.`;
            return res.status(401).json({ message });
          } else {
            // JWT
            // Créé le TOKEN 
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "1y",
            });

            // Renvoie le TOKEN
            const message = `User successfully logged in`;
            return res.json({ message, data: user, token });
          }
        });
    })
    // Erreur si la connections à la base de donnée n'a pas pu ce faire
    .catch((error) => {
      const message = `The user could not be connected. Please try again in a few moments`;
      return res.json({ message, data: error });
    });
});
export { loginRouter };
