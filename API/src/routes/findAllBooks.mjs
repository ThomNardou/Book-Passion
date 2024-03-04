import express from "express";
import { books } from "../db/mock-books.mjs";
import { success } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";

const allBooksRooter = express();

allBooksRooter.get("/", (req, res) => {
  Book.findAll()
    .then((books) => {
      const message = "The book list has been retrieved.";
      res.json(success(message, books));
    })
    .catch((error) => {
      const message =
        "The product list could not be retrieved. Please try again shortly.";
      res.status(500).json({ message, data: error });
    });
});

export { allBooksRooter };
