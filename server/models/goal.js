'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    tableName: 'goal',
    timestamps: true
  });
  return Goal;
};