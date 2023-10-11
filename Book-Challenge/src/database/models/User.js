module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    Id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    country: {
      type: dataTypes.STRING
    },
    pass: {
      type: dataTypes.STRING
    },
    categoryId: {
      type: dataTypes.INTEGER
    }
  };
  let config = {
    tableName: 'Users',
    timestamps: false
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo (models.Categorie, {
      as: "category",
      foreingKey: "CategoryId"
    })
  }
  return User;
};
