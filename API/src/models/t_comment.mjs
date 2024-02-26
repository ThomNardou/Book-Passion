const commentModel = (sequelize, DataTypes) => {
  return sequelize.define("t_books", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le commentaire ne peut pas être vide.",
        },
        notNull: {
          msg: "Le commentaire est une propriété obligatoire.",
        },
      },
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La catégorie ne peut pas être vide.",
        },
        notNull: {
          msg: "La catégorie est une propriété obligatoire.",
        },
      },
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_book: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

export { commentModel };
