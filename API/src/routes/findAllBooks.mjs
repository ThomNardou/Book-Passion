import express from "express";
import {books} from "../db/mock-books.mjs";
import { success } from "./helper.mjs";

const allBooksRooter = express();

allBooksRooter.get("/", (req, res) => {
    const message = "La liste des livres a bien été récupérée.";
    res.json(success(message, books));
  });

export { allBooksRooter };