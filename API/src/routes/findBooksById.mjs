import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const idBooksRooter = express();
// api/books/:id/:id
idBooksRooter.get("/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId)
  const message = `Le produit dont l'id vaut ${bookId} a bien été récupéré.`;
  res.json(success(message, book));
});

export { idBooksRooter };