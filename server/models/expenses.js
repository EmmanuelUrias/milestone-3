'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expenses.init({
    expense_id: DataTypes.INTEGER,
    expense_name: DataTypes.STRING,
    expense_amount: DataTypes.INTEGER,
    expense_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    time_stamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};