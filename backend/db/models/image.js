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
  };
  return Image;
};
