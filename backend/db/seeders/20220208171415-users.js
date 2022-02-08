'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  return queryInterface.bulkInsert('Users', [
    {
      username: 'PoppyHill',
      email: 'poppy@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'Casper',
      email: 'casper@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'TheGradyTwins',
      email: 'gradyx2@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'Gozer',
      email: 'gozer@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'LydiaDeetz',
      email: 'lydia@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'MoaningMyrtle',
      email: 'myrtle@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'UncleFester',
      email: 'fester@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'Samara',
      email: 'samara@ghostmail.rip',
      hashedPassword: bcrypt.hashSync('password')
    },
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  return queryInterface.bulkDelete('Users', null, {});
  }
};
