"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMember.init(
    {
      idUser: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "idUser",
        },
      },
      idChatSession: {
        type: DataTypes.INTEGER,
        references: {
          model: "chat_sessions",
          key: "id",
          as: "idChatSession",
        },
      },
    },
    {
      sequelize,
      modelName: "ChatMember",
      underscored: true,
    }
  );
  return ChatMember;
};
