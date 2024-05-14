import express from "express";
import { success } from "../helper.mjs";
import { Comments } from "../../db/sequelize.mjs";
import { User } from "../../db/sequelize.mjs";
import { Book } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const allCommentsRouters = express();

allCommentsRouters.get("/:bookId", (req, res) => {
  if (req.query.order) {
    // Cherche toutes le catégories
    Comments.findAndCountAll({
      order: [[req.query.order, "DESC"]],
      include: [
        {
          model: Book,
          required: true,
          attributes: ["id", "title"],
          where: {
            id: { [Op.eq]: req.params.bookId },
          },
        },
        {
          model: User,  
          required: true,
          attributes: ["id", "username"],
        }
      ]
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
