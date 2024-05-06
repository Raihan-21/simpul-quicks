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
          model: "User",
          key: "id",
        },
      },
      idChatSession: {
        type: DataTypes.INTEGER,
        references: {
          model: "ChatSession",
          key: "id",
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
