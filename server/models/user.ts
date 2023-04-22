'use strict';
import { Model, Sequelize } from 'sequelize';


interface UserAttributes {
  user_id: number
  user_name: string,
  password: string,
  email: string,
  budget: number,
  time_stamp: string
}

export interface DataTypes {
  INTEGER: any,
  STRING: string,
  DATE: string
}

module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  class User extends Model<UserAttributes> {
    static associate(models: {Goal: any, Expense: any}) {
      User.hasMany(models.Goal, {
        foreignKey: 'user_id',
        as: 'goal'
      })

      User.hasMany(models.Expense, {
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
    tableName: 'user'
    });
  return User;
};