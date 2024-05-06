"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany(models.User, {
        through: models.ChatMember,
        as: "User",
        foreignKey: "id_user",
        otherKey: "id_chat_session",
      });
    }
  }
  ChatSession.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChatSession",
      underscored: true,
    }
  );
  return ChatSession;
};
