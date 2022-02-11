'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spooking = sequelize.define('Spooking', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hauntId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    polterguests: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Spooking.associate = function(models) {
    Spooking.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Spooking.belongsTo(models.Haunt, {
      foreignKey: 'hauntId'
    });
  };
  return Spooking;
};
