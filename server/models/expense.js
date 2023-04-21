'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      Expense.belongsTo(User, {
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
    tableName: 'expense',
    timestamps: true
  });
  return Expense;
};