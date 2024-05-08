"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.ChatSession, {
        through: models.ChatMember,
        as: "ChatSession",
        foreignKey: "id_chat_session",
        otherKey: "id_user",
      });
      this.hasMany(models.Message, { foreignKey: "id_user" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
