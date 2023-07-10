'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review,{foreignKey: "userId"})
      User.hasMany(models.WishList,{foreignKey: "userId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg:'Email must be unique'
      },
      validate:{
        notEmpty:{
          msg:'Email is required'
        },
        notNull:{
          msg:'Email is required'
        },
        isEmail:{
          msg:'Invalid email format'
        },
      }
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:'Password is required'
        },
        notNull:{
          msg:'Password is required'
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};