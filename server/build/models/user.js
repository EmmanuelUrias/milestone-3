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
exports.initUserModel = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.associate = function (models) {
        User.hasMany(models.Goal, {
            foreignKey: 'user_id',
            as: 'goal'
        });
        User.hasMany(models.Expense, {
            foreignKey: 'user_id',
            as: 'expense'
        });
    };
    return User;
}(sequelize_1.Model));
exports.User = User;
function initUserModel(sequelize) {
    User.init({
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        user_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        budget: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        time_stamp: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
    }, {
        sequelize: sequelize,
        modelName: 'User',
        tableName: 'user'
    });
    return User;
}
exports.initUserModel = initUserModel;
;
