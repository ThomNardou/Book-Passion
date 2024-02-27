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
          msg: "The comment cannot be empty.",
        },
        notNull: {
          msg: "The comment is a mandatory property.",
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
