import { DataTypes, Sequelize } from "sequelize";
import { bookModel } from "../models/t_books.mjs";
import { categoryModel } from "../models/t_category.mjs";
import { commentModel } from "../models/t_comment.mjs";
import { UserModel } from "../models/t_user.mjs";
import bcrypt from "bcrypt";

const sequelize = new Sequelize("db_books", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
});

const Book = bookModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Comments = commentModel(sequelize, DataTypes);

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
  as: "Category"
});

let initDB = () => {
  return sequelize.sync({ force: true }).then(() => {
    importUsers();
    console.log("The database has been synchronized.");
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
        nbrCommentsDone: 2
      })
    )
    .then((user) => console.log(user.toJSON()));
};

export { sequelize, initDB, Book, Category, User, Comments };
