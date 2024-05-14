import express from "express";
import { success } from "../helper.mjs";
import { Comments } from '../../db/sequelize.mjs';
import { ValidationError } from "sequelize";
import { auth } from "../../auth/auth.mjs";
import jwt from 'jsonwebtoken'

const createCommentRooter = express();

createCommentRooter.post("/", auth,(req, res) => {

    console.log(jwt.decode(req.headers.authorization));

  // Création d'un commentaire avec les données reçues
  Comments.create(req.body)
    .then((createdComment) => {
      // Renvoie un message de succès
      const message = `The Comment ${createdComment.title} has indeed been posted !`;
      res.json(success(message, createdComment));
    })
    // Si une erreur est survenue lors de la création du livre
    .catch((error) => {
      // Si l'erreur est une erreur de validation (400)
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      
      // Renvoie un message d'erreur (500)
      const message = "The comment could not be posted. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { createCommentRooter };
