'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('sub_modules', [{
      name: "Inventory balance Summary",
      moduleId: 1
    },
    {
      name: "Product Selling Prices",
      moduleId: 1
    },
    {
      name: "Product Website Connect configuration",
      moduleId: 1
    },
    {
      name: "Holds/SaleOrders Tab",
      moduleId: 1
    },

    {
      name: "Customer Accounting information",
      moduleId: 2
    },
    {
      name: "Customer Sales lock notes",
      moduleId: 2
    },
    {
      name: "Customer default",
      moduleId: 2
    },
    {
      name: "Customer Credit related information",
      moduleId: 2
    },
    {
      name: "Supplier information",
      moduleId: 3
    },
    {
      name: "Supplier AP Details",
      moduleId: 3
    },
    {
      name: "Payments Details",
      moduleId: 3
    },
    {
      name: "Transit Details",
      moduleId: 3
    },
    {
      name: "Location Information",
      moduleId: 4
    },
    {
      name: "Location User list",
      moduleId: 4
    },
    {
      name: "Location Transfers",
      moduleId: 4
    },
    {
      name: "Location Bin detail",
      moduleId: 4
    }
    ])
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
