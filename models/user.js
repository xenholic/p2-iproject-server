'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Price, {
        through: "Transaction",
        foreignKey: "UserId",
      });
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username is Required"
        },
        notEmpty: {
          args: true,
          msg: "Username is Required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "E-mail is Required"
        },
        notEmpty: {
          args: true,
          msg: "E-mail is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is Required"
        },
        notEmpty: {
          args: true,
          msg: "Password is Required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password, 10)
      }
    }
  });
  return User;
};