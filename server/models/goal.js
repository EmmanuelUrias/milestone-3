'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {

    static associate({User}) {
      Goal.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Goal.init({
    goal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    goal_amount: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    time_stamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Goal',
    tableName: 'goal',
    timestamps: false
  });
  return Goal;
};