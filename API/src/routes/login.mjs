import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();

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
