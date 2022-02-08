'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  return queryInterface.bulkInsert('Haunts', [
    {
      name: 'Hill House',
      userId: 2,
      address: '666 Crain Boulevard',
      city: 'Lenox',
      state: 'Massachusetts',
      country: 'United States',
      latitude: 42.352414,
      longitude: -73.279664,
      rate: 200,
      description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
    },
    {
      name: 'Whipstaff Manor',
      userId: 3,
      address: '16 Crain Boulevard',
      city: 'Friendship',
      state: 'Maine',
      country: 'United States',
      latitude: 42.352414,
      longitude: -73.279664,
      rate: 200,
      description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
