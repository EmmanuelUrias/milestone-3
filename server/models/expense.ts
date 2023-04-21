'use strict';
import { Model, Sequelize } from 'sequelize';
import { DataTypes } from './user';

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  class Expense extends Model {
    static associate(models: { User: any }) {
      Expense.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Expense.init({
    expense_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
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
      unique: true
    },
    time_stamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expense'
  });
  return Expense;
};