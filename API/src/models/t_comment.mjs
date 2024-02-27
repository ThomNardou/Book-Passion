const commentModel = (sequelize, DataTypes) => {
  return sequelize.define("t_comments", {
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
      allowNull: true,
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
