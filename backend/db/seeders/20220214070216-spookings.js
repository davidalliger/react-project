'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spookings', [
        {
          userId: 1,
          hauntId: 3,
          startDate: new Date('2020-05-13'),
          endDate: new Date('2020-05-16'),
          polterguests: 1
        },
        {
          userId: 1,
          hauntId: 4,
          startDate: new Date('2021-06-21'),
          endDate: new Date('2021-06-23'),
          polterguests: 2
        },
        {
          userId: 1,
          hauntId: 5,
          startDate: new Date('2022-01-17'),
          endDate: new Date('2022-01-24'),
          polterguests: 1
        },
        {
          userId: 1,
          hauntId: 7,
          startDate: new Date('2021-12-09'),
          endDate: new Date('2021-12-12'),
          polterguests: 4
        },
        {
          userId: 1,
          hauntId: 6,
          startDate: new Date('2022-09-13'),
          endDate: new Date('2022-09-16'),
          polterguests: 1
        },
        {
          userId: 1,
          hauntId: 2,
          startDate: new Date('2022-07-19'),
          endDate: new Date('2022-07-22'),
          polterguests: 2
        },
        {
          userId: 1,
          hauntId: 8,
          startDate: new Date('2022-03-04'),
          endDate: new Date('2022-03-06'),
          polterguests: 1
        },
        {
          userId: 2,
          hauntId: 7,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 3
        },
        {
          userId: 3,
          hauntId: 6,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 2
        },
        {
          userId: 4,
          hauntId: 5,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 1
        },
        {
          userId: 5,
          hauntId: 4,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 1
        },
        {
          userId: 6,
          hauntId: 3,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 3
        },
        {
          userId: 7,
          hauntId: 2,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 1
        },
        {
          userId: 8,
          hauntId: 1,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 2
        },
        {
          userId: 9,
          hauntId: 8,
          startDate: new Date('2022-02-18'),
          endDate: new Date('2022-02-20'),
          polterguests: 1
        },
      ], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Spookings', null, {});
  }
};
