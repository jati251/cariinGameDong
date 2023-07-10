'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User,{foreignKey: "userId"})
    }
  }
  Review.init({
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Can't post empty review`,
        },
        notEmpty: {
          msg: `Can't post empty review`,
        },
      },
    },
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};