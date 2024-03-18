import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";
import { allBooksRooter } from "./routes/books/findAllBooks.mjs";
import { idBooksRooter } from "./routes/books/findBooksById.mjs";
import { categoryBooksRooter } from "./routes/books/findBooksByCategory.mjs";
import { putBooksRooter } from "./routes/books/updateBooks.mjs";
import { createBooksRouter } from "./routes/books/createBooks.mjs";
import { deleteBooksRouter } from "./routes/books/deleteBooks.mjs";
import { allCategoryRooter } from "./routes/category/findAllCategory.mjs";
import { createCategoryRouter } from "./routes/category/createCategory.mjs";
import { deleteCategoryRouter } from "./routes/category/deleteCategory.mjs";
import { putCategoryRooter } from "./routes/category/updateCategory.mjs";
import { idCategoryRooter } from "./routes/category/findCategoryById.mjs";
import { sequelize, initDB } from "./db/sequelize.mjs";
import { loginRouter } from "./routes/login.mjs";
import { SwaggerTheme } from "swagger-themes";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const theme = new SwaggerTheme();
const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};

//swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, options, { explorer: true })
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
//define the root to get all books
app.use("/api/books", allBooksRooter);

//define the root to get book by id
app.use("/api/books", idBooksRooter);

//define the root to get book by category
app.use("/api/categories", categoryBooksRooter);

//define the root to update book
app.use("/api/books", putBooksRooter);

//define the root to define the root to create book
app.use("/api/books", createBooksRouter);

//define the root to delete book
app.use("/api/books", deleteBooksRouter);

///////////////////////////////////////////////////////////// CATEGORY ROOTERS /////////////////////////////////////////////////////////////
// define the root to Get all category
app.use("/api/categories", allCategoryRooter);

// define the root to Get category by ID
app.use("/api/categories", idCategoryRooter);

// define the root to Create category
app.use("/api/categories", createCategoryRouter);

// define the root to Delete category
app.use("/api/categories", deleteCategoryRouter);

// define the root to Delete category
app.use("/api/categories", putCategoryRooter);

// define the root for the login
app.use("/api/login", loginRouter);

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

//Error 404 if the URL don't exist
app.use(({ res }) => {
  const message = "Unable to find the requested resource! Try another URL.";
  res.status(404).json(message);
});

//Listen
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
