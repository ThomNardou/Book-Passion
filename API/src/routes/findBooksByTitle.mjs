import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const titleBooksRooter = express();

titleBooksRooter.get("/:title", (req, res) => {
  const bookTitle = req.params.title;
  const book = books.find((book) => book.title == bookTitle)
  const message = `Le livre dont le titre est ${bookTitle} a bien été récupéré.`;
  res.json(success(message, book));
});

export { titleBooksRooter };