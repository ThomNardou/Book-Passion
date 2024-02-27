const UserModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "cette utilisateur est déjà pris" },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nbrBookRecommended: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nbrRatingDone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nbrCommentsDone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "EntryDate",
      updateAt: false,
    }
  );
};

export { UserModel };
