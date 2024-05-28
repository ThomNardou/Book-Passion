const commentModel = (sequelize, DataTypes) => {
  return sequelize.define("t_comments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The comment title cannot be empty.",
        },
        notNull: {
          msg: "The comment title is a mandatory property.",
        },
      }
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
      validate: {
        isInt: {
          msg: "The rate must be an integer.",
        },
        max: {
          args: 5,
          msg: "The rate must be less than 5.",
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
