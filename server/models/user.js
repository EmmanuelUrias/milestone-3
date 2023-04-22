'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({Goal, Expense}) {
      User.hasMany(Goal, {
        foreignKey: 'user_id',
        as: 'goal'
      })

      User.hasMany(Expense, {
        foreignKey: 'user_id',
        as: 'expense'
      })
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    budget: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    time_stamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
  });
  return User;
};