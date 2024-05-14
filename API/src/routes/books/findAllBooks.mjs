import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { Op } from "sequelize";
import { auth } from "../../auth/auth.mjs";
import { Category } from "../../db/sequelize.mjs";
import { User } from "../../db/sequelize.mjs";

const allBooksRooter = express();

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all books.
 *     description: Retrieve all books.
 *     responses:
 *       200:
 *         description: Retrieve all book.
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
 *                   title:
 *                     type: string
 *                     description: The book's title.
 *                     example: Harry Potter
 *                   numberPages:
 *                     type: number
 *                     description: the number of pages in the book.
 *                     example: 539
 *                   excerpt:
 *                     type: string
 *                     description: An extract of the book.
 *                     example: Lorem Ipsum
 *                   summary:
 *                     type: string
 *                     description: the book summary.
 *                     example: Lorem Ipsum
 *                   writer:
 *                     type: string
 *                     description: the book's author.
 *                     example: J.K rollings
 *                   editor:
 *                     type: string
 *                     description: the book's editor.
 *                     example: Bloomsbury Publishing
 *                   releaseDate:
 *                     type: number
 *                     description: year of book release.
 *                     example: 2024
 *                   avgRating:
 *                     type: float
 *                     description: the average rating given by users.
 *                     example: 4.2
 *                   imageLink:
 *                     type: string
 *                     description: a link to the book cover image.
 *                     example: https://exemple.com/image.png
 *                   fk_user:
 *                     type: number
 *                     description: the identifier of the user who receives the book.
 *                     example: 1
 *                   fk_category:
 *                     type: number
 *                     description: the identifier of book's category.
 *                     example: 1
 *
 */
allBooksRooter.get("/", (req, res) => {
  let limitReq = 5;

  if (req.query.limit) {
    limitReq = parseInt(req.query.limit);
  }

  // Regarde si le paramètre title est présent dans la requête
  if (req.query.title) {
    // vérifie si sa longueur est inférieure à 2
    if (req.query.title.length < 2) {
      // Si c'est le cas, renvoie un message d'erreur (400)
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }

    // Sinon, recherche les livres dont le titre contient le terme de la recherche
    return (
      Book.findAndCountAll({
        where: { title: { [Op.like]: `%${req.query.title}%` } },
        order: ["title"],
        limit: limitReq,
        include: [
          {
            model: Category,
            required: true,
            attributes: ["id", "name"],
          },
          {
            model: User,
            required: true,
            attributes: ["id", "username"],
          }
        ],
      })
        .then((books) => {
          // Si aucun livre n'est trouvé
          if (books.count == 0) {
            // Renvoie un message "d'erreur" (200)
            const message = "No books found.";
            return res.status(200).json({ message });
          }
          // Renvoie la liste des livres trouvés
          const message = "The book list has been retrieved.";
          res.json(success(message, books));
        })
        // Si une erreur se produit lors de la recherche des livres
        .catch((error) => {
          // renvoie un message d'erreur (500)
          const message =
            "The book list could not be retrieved. Please try again shortly.";
          res.status(500).json({ message, data: error });
        })
    );
  }

  if (req.query.order) {
    // Sinon, recherche les livres dont le titre contient le terme de la recherche
    return (
      Book.findAndCountAll({
        order: [[req.query.order, "DESC"]],
        limit: limitReq,
        include: [
          {
            model: Category,
            required: true,
            attributes: ["id", "name"],
          },
          {
            model: User,
            required: true,
            attributes: ["id","username"],
          }
        ],
      })
        .then((books) => {
          // Si aucun livre n'est trouvé
          if (books.count == 0) {
            // Renvoie un message "d'erreur" (200)
            const message = "No books found.";
            return res.status(200).json({ message });
          }
          // Renvoie la liste des livres trouvés
          const message = "The book list has been retrieved.";
          res.json(success(message, books));
        })
        // Si une erreur se produit lors de la recherche des livres
        .catch((error) => {
          // renvoie un message d'erreur (500)
          const message =
            "The book list could not be retrieved. Please try again shortly.";
          res.status(500).json({ message, data: error });
        })
    );
  }

  // Si le paramètre title n'est pas présent dans la requête
  Book.findAndCountAll({
    include: [
      {
        model: Category,
        required: true,
        attributes: ["id", "name"],
      },
      {
        model: User,
        required: true,
        attributes: ["id","username"],
      }
    ],
  })
    .then((books) => {
      // Si aucun livre n'est trouvé
      if (books.count == 0) {
        // Renvoie un message "d'erreur" (200)
        const message = "There are no books registered.";
        return res.json({ message });
      }

      // renvoie la liste des livres trouvés
      const message = "The book list has been retrieved.";
      res.json(success(message, books));
    })
    // Si une erreur se produit lors de la recherche des livres
    .catch((error) => {
      // renvoie un message d'erreur
      const message =
        "The book list could not be retrieved. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { allBooksRooter };
