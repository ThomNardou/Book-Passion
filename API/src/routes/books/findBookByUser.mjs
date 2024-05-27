import express from "express";
import { success } from "../helper.mjs";
import { Category } from "../../db/sequelize.mjs";
import { Book } from "../../db/sequelize.mjs";
import { User } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";

const userBooksRooter = express();


userBooksRooter.get("/:id/books", (req, res) => {
  const bookuser = req.params.id;

  User.findByPk(bookuser)
    .then((user) => {
      // Si la catégorie n'existe pas
      if (!user) {
        // Retourne un message d'erreur (404)
        const message = `The user with id ${bookuser} does not exist.`;
        return res.status(404).json({ message });
      }

      // Cherche les livres avec la catégorie demandée et compte le nombre de résultats
      Book.findAndCountAll({
        include: [
          {
            model: Category,
            required: true,
            attributes: ["id", "name"]
        },
        {
            model: User,  
            required: true,
            attributes: ["username"],
            where: {
              id: { [Op.eq]: bookuser },
            },
          }
        ],
      })
        .then((userBook) => {
          // Si aucun livre n'est trouvé
          if (userBook.count == 0) {
            // Retourne un message d'erreur (404)
            const message = `No books with user ${userBook} have been found.`;
            return res.status(200).json({ message });
          }

          // Retourne les livres trouvés
          const message = `The books with user ${userBook} have been retrieved.`;
          res.json(success(message, userBook));
        })
        // Si une erreur est survenue lors de la récupération des livres
        .catch((error) => {
          // Retourne un message d'erreur (500)
          const message =
            "The books could not be recovered. Please try again shortly.";
          res.status(500).json({ message, data: error });
        });
    })
    // Si une erreur est survenue lors de la récupération de la catégorie
    .catch((error) => {
      // Retourne un message d'erreur (500)
      const message =
        "The user could not be recovered. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { userBooksRooter };
