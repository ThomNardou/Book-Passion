import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const categoryBooksRooter = express();

categoryBooksRooter.get("/:category", (req, res) => {
  const bookCategory = req.params.category;
  const categorybook = books.filter((book) => book.category == bookCategory);
  const message = `Les livres dont la catégorie vaut ${bookCategory} ont bien été récupérés.`;
  res.json(success(message, categorybook));
});

export { categoryBooksRooter };