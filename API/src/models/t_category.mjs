const categoryModel = (sequelize, DataTypes) => {
  return sequelize.define("t_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The category name cannot be empty.",
        },
        notNull: {
          msg: "The category name is a mandatory property.",
        },
      },
    },
  });
};

export { categoryModel };
