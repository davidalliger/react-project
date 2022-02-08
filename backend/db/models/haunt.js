'use strict';
module.exports = (sequelize, DataTypes) => {
  const Haunt = sequelize.define('Haunt', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      allowNull: false,
      type:DataTypes.STRING(100),
    },
    city: {
      allowNull: false,
      type:DataTypes.STRING(100),
    },
    state: {
      allowNull: false,
      type:DataTypes.STRING(100),
    },
    country: {
      allowNull: false,
      type:DataTypes.STRING(100),
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Haunt.associate = function(models) {
    // associations can be defined here
    Haunt.hasMany(models.Image, {
      foreignKey: 'hauntId'
    });
  };
  return Haunt;
};
