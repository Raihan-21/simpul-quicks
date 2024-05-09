"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("chat_members", [
      {
        id_user: 3,
        id_chat_session: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 4,
        id_chat_session: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 4,
        id_chat_session: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
