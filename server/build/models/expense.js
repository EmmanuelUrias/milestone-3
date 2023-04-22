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
    var Expense = /** @class */ (function (_super) {
        __extends(Expense, _super);
        function Expense() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Expense.associate = function (models) {
            Expense.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });
        };
        return Expense;
    }(sequelize_1.Model));
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
        sequelize: sequelize,
        modelName: 'Expense',
        tableName: 'expense'
    });
    return Expense;
};
