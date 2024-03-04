import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";
import { allBooksRooter } from "./routes/books/findAllBooks.mjs";
import { idBooksRooter } from "./routes/books/findBooksById.mjs";
import { categoryBooksRooter } from "./routes/books/findBooksByCategory.mjs";
import { titleBooksRooter } from "./routes/books/findBooksByTitle.mjs";
import { putBooksRooter } from "./routes/books/updateBooks.mjs";
import { createBooksRouter } from "./routes/books/createBooks.mjs";
import { deleteBooksRouter } from "./routes/books/deleteBooks.mjs";
import { allCategoryRooter } from "./routes/category/findAllCategory.mjs";
import { createCategoryRouter } from "./routes/category/createCategory.mjs";
import { deleteCategoryRouter } from "./routes/category/deleteCategory.mjs";
import { putCategoryRooter } from "./routes/category/updateCategory.mjs";
import { sequelize, initDB } from "./db/sequelize.mjs";
import { loginRouter } from "./routes/login.mjs";

const app = express();

app.use(express.json());

const port = 3000;

//swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

//login authentication
app.use("/api/login", loginRouter);

//TODO : check if useful
app.get("/", (req, res) => {
  res.redirect(`http://localhost:${port}/api/books`);
});

//TODO : check if useful
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

///////////////////////////////////////////////////////////// BOOKS ROOTERS /////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////// CATEGORY ROOTERS /////////////////////////////////////////////////////////////
// Get all category
app.use("/api/category", allCategoryRooter);

// Create category
app.use("/api/category", createCategoryRouter);

// Delete category
app.use("/api/category", deleteCategoryRouter);

// Delete category
app.use("/api/category", putCategoryRooter);






//database
sequelize
  // Check if the connection has been made
  .authenticate()
  // If it could connect
  .then(() =>
    console.log("The connection to the database has been established.")
  )
  // If it could'nt connect
  .catch((error) => console.error("Unable to connect to DB"));

  initDB(); //you need to be connected to the database else "error", will delete the data

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
