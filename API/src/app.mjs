import express from "express";
import { books } from "./db/mock-books.mjs";
import { success } from "./routes/helper.mjs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";
import { allBooksRooter } from "./routes/findAllBooks.mjs";
import { idBooksRooter } from "./routes/findBooksById.mjs";
import { categoryBooksRooter } from "./routes/findBooksByCategory.mjs";
import { titleBooksRooter } from "./routes/findBooksByTitle.mjs";
import { putBooksRooter } from "./routes/updateBooks.mjs";
import { createBooksRouter } from "./routes/createBooks.mjs";
import { deleteBooksRouter } from "./routes/deleteBooks.mjs";
import { initDB, sequelize } from "./db/sequelize.mjs";

const app = express();

app.use(express.json());

const port = 3000;

//swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

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

//get book by category
app.use("/api/books/category", categoryBooksRooter);

//get book by title
app.use("/api/books/title", titleBooksRooter);

//update book
app.use("api/books", putBooksRooter);

//create book
app.use("/api/books", createBooksRouter);

//delete book
app.use("/api/books", deleteBooksRouter);

//database
sequelize
  // Va regarder si la connection a pu se faire
  .authenticate()
  // Si elle a pu se connecter
  .then(() =>
    console.log("La connexion à la base de données a bien été établie")
  )
  // Elle a pas pu se connecter
  .catch((error) => console.error("Impossible de se connecter à la DB"));

// initDB(); //you need to be connected to the database else "error"

//Error 404
app.use(({ res }) => {
  const message =
    "Unable to find the requested resource! Try another URL.";
  res.status(404).json(message);
});

//Listen
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
