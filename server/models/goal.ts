'use strict';
import { Model, Sequelize } from 'sequelize';
import { DataTypes } from './user';

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  class Goal extends Model {

    static associate(models: { User: any }) {
      Goal.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Goal.init({
    goal_id: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Goal',
    tableName: 'goal'
    });
  return Goal;
};