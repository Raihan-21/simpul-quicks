"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ChatSession, { foreignKey: "id_chat_session" });
      this.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  Message.init(
    {
      idChatSession: {
        type: DataTypes.NUMBER,
        references: {
          model: "ChatSession",
          key: "id",
        },
      },
      content: DataTypes.STRING,
      idUser: {
        type: DataTypes.NUMBER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Message",
      underscored: true,
    }
  );
  return Message;
};
