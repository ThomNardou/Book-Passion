import { DataTypes, Sequelize } from "sequelize";
import { bookModel } from "../models/t_books.mjs";
import { categoryModel } from "../models/t_category.mjs";
import { commentModel } from "../models/t_comment.mjs";
import { UserModel } from "../models/t_user.mjs";
import bcrypt from "bcrypt";

// Création de la connexion
const sequelize = new Sequelize("db_books", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
});

// Définis les models
const Book = bookModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Comments = commentModel(sequelize, DataTypes);

// Création des relations
Category.hasMany(Book, {
  foreignKey: "fk_category",
});


User.hasMany(Book, {
  foreignKey: "fk_user",
});
Book.hasMany(Comments, {
  foreignKey: "fk_book",
});
User.hasMany(Comments, {
  foreignKey: "fk_user",
});


Comments.belongsTo(User, {
  foreignKey: "fk_user",
});
Comments.belongsTo(Book, {
  foreignKey: "fk_book",
});
Book.belongsTo(User, {
  foreignKey: "fk_user",
});
Book.belongsTo(Category, {
  foreignKey: "fk_category",
});

// importation des données
let initDB = () => {
  return sequelize
    .sync({ force: false })
    .then( async () => {
      // const temp = importBooks();
      // importCategories();

      // console.log(temp)

      // return Book.findOne({ where: { title: "testCreate" } });
      importUsers();

      console.log("The database has been synchronized.");
    })

    // .then((book) => {
    //   books = book;
    //   console.log(book)
    //   return Category.findOne({ where: { name: "coucou" } }).then((category) => {
    //     categories = category;
    //     console.log(category)
    //     // Book.update({ fk_category: category.id });
    //   });
    // });
};

const importBooks = () => {
  return Book.create({
    title: "testCreate",
    numberPages: 500,
    excerpt: "Lorem Ipsum",
    summary: "Lorem",
    writer: "Michel Duvois",
    editor: "aaaaaaaaaa",
    releaseYear: 2024,
    avgRating: 4.2,
    coverImage: "ghsrighsrgs.com",
  });
};

const importCategories = async () => {
  await Category.create({
    name: "coucou",
  });
};

const importUsers = () => {
  bcrypt
    .hash("etml", 10) // temps pour hasher = du sel
    .then((hash) =>
      User.create({
        username: "etml",
        password: hash,
        nbrBookRecommended: 4,
        nbrRatingDone: 2,
        nbrCommentsDone: 2,
      })
    )
    .then((user) => console.log(user.toJSON()));
};

export { sequelize, initDB, Book, Category, User, Comments };
