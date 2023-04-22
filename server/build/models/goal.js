'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    var Goal = /** @class */ (function (_super) {
        __extends(Goal, _super);
        function Goal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Goal.associate = function (models) {
            Goal.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });
        };
        return Goal;
    }(sequelize_1.Model));
    Goal.init({
        goal_id: {
            type: DataTypes.INTEGER
        },
        goal_amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true
        }
    }, {
        sequelize: sequelize,
        modelName: 'Goal',
        tableName: 'goal'
    });
    return Goal;
};
