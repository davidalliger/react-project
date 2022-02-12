'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      references: {model: 'Users'}
    },
    hauntId: {
      type: DataTypes.INTEGER,
      references: {model: 'Haunts'}
    },
    url: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Haunt, {
      foreignKey: 'hauntId'
    });
    Image.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Image;
};
