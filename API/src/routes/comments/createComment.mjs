import express from "express";
import { success } from "../helper.mjs";
import { Book } from "../../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { auth } from "../../auth/auth.mjs";
import jwt from 'jsonwebtoken'

const createCommentRooter = express();

createBooksRouter.post("/", auth,(req, res) => {

    console.log(jwt.decode(req.headers.authorization));

  // Création d'un livre avec les données reçues
  Book.create(req.body)
    .then((createdBook) => {
      // Renvoie un message de succès
      const message = `The books ${createdBook.title} has indeed been created !`;
      res.json(success(message, createdBook));
    })
    // Si une erreur est survenue lors de la création du livre
    .catch((error) => {
      // Si l'erreur est une erreur de validation (400)
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      // Renvoie un message d'erreur (500)
      const message = "The book could not be added. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createCommentRooter };
