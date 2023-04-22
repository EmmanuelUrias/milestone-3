'use strict';
import { Model, Sequelize } from 'sequelize';
import { DataTypes } from './user';

interface ExpenseAttributes {
  expense_id: number,
  expense_name: string,
  expense_amount: number,
  expense_type: string,
  user_id: number,
  time_stamp: string
}

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  class Expense extends Model<ExpenseAttributes> {
    static associate(models: { User: any }) {
      Expense.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Expense.init({
    expense_id: {
      type: DataTypes.INTEGER
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