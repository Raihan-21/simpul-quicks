"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_chat_session: {
        type: Sequelize.INTEGER,
        references: {
          model: "chat_sessions",
          key: "id",
          as: "idChatSession",
        },
      },
      content: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "idUsers",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("messages");
  },
};
