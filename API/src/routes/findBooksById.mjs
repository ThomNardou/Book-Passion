import express from "express";
import { books } from "../db/mock-books.mjs";
import { success, getBook } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const idBooksRooter = express();

idBooksRooter.get("/:id", (req, res) => {
  Book.findByPk(req.params.id).then((book) => {
    const message = `Le livre dont l'id vaut ${req.params.id} a bien été récupéré.`;
    res.json(success(message, book));
  });
});

export { idBooksRooter };