const bookModel = (sequelize, DataTypes) => {
  return sequelize.define("t_books", {
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
          msg: "The title cannot be empty.",
        },
        notNull: {
          msg: "Title is a mandatory property.",
        },
      },
    },
    numberPages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The number of pages cannot be empty.",
        },
        notNull: {
          msg: "The number of pages is a mandatory property.",
        },
      },
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The excerpt cannot be empty.",
        },
        notNull: {
          msg: "The extract is a mandatory property.",
        },
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The summary cannot be empty.",
        },
        notNull: {
          msg: "The summary is a mandatory property.",
        },
      },
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The author's name cannot be empty.",
        },
        notNull: {
          msg: "The author's name is a mandatory property.",
        },
      },
    },
    editor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The editor's name cannot be empty.",
        },
        notNull: {
          msg: "The editor's name is a mandatory property.",
        },
      },
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The publishing year cannot be empty.",
        },
        notNull: {
          msg: "The year of publication is a mandatory property.",
        },
      },
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The illustration image link cannot be empty.",
        },
        notNull: {
          msg: "The illustration image link is a mandatory property.",
        },
      },
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

export { bookModel };
