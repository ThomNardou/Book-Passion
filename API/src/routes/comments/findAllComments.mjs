import express from "express";
import { success } from "../helper.mjs";
import { Comments } from "../../db/sequelize.mjs";
import { auth } from "../../auth/auth.mjs";

const allCommentsRouters = express();

allCommentsRouters.get("/", (req, res) => {
  if (req.query.order) {
    // Cherche toutes le catégories
    Comments.findAndCountAll({
      order: [[req.query.order, "DESC"]]
    })
      .then((comments) => {

        // Renvoie la liste
        const message = "The Comments list has been retrieved.";
        res.json(success(message, comments));
      })
      // Si une erreur se produit lors de la recherche des catégories
      .catch((error) => {
        // Renvoie le message d'erreur (500)
        const message =
          "The Comments list could not be retrieved. Please try again shortly.";
        res.status(500).json({ message, data: error });
      });


  } else {
    // Cherche toutes le catégories
    Comments.findAndCountAll()
      .then((comments) => {

        // Renvoie la liste
        const message = "The Comments list has been retrieved.";
        res.json(success(message, comments));
      })
      // Si une erreur se produit lors de la recherche des catégories
      .catch((error) => {
        // Renvoie le message d'erreur (500)
        const message =
          "The Comments list could not be retrieved. Please try again shortly.";
        res.status(500).json({ message, data: error });
      });
  }
});

export { allCommentsRouters };
