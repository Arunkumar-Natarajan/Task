"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Modules", [
      {
        name: "Products",
      },
      {
        name: "Customers",
      },
      {
        name: "Inventory Supplier",
      },
      {
        name: "Location Management",
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
