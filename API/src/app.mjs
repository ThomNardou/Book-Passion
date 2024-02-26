import express from "express";
import { books } from "./db/mock-books.mjs";
import { success } from "./routes/helper.mjs";
import { allBooksRooter } from "./routes/findAllBooks.mjs";
import { idBooksRooter } from "./routes/findBooksById.mjs";

const app = express();

app.use(express.json());

const port = 3000;

//TODO : check if useful
app.get("/", (req, res) => {
  res.redirect(`http://localhost:${port}/api/books`);
});

//TODO : check if useful
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

//get all books
app.use("/api/books", allBooksRooter);

//get book by id
app.use("/api/books", idBooksRooter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
