import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const idBooksRooter = express();

idBooksRooter.get("/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => books.id == bookId)
  const message = `Le produit dont l'id vaut ${productId} a bien été récupéré.`;
  res.json(success(message, books));
});

export { idBooksRooter };