'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER
    },
    hauntId: {
      type: DataTypes.INTEGER
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
