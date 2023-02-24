'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('user_accesses', [{
      accessName: "All"
    },
    {
      accessName: "View"
    },
    {
      accessName: "Create"
    },
    {
      accessName: "Update"
    },
    {
      accessName: "Delete"
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
