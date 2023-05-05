'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {

    static associate({ User }) {
      Expense.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Expense.init({
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    expense_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expense_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expense_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time_stamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expense',
    timestamps: false
  });
  return Expense;
};