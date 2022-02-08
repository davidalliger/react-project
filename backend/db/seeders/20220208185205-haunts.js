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
        address: '2018 Crain Boulevard',
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
        address: '1993 McFadden Street',
        city: 'Friendship',
        state: 'Maine',
        country: 'United States',
        latitude: 43.987294,
        longitude: -69.342520,
        rate: 150,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'The Overlook Hotel',
        userId: 4,
        address: '333 E Wonderview Ave',
        city: 'Estes Park',
        state: 'Colorado',
        country: 'United States',
        latitude: 40.383072,
        longitude: -105.519121,
        rate: 250,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'The Shandor Building',
        userId: 5,
        address: '550 Central Park West',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        latitude: 40.772274,
        longitude: -73.979063,
        rate: 360,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'The Maitland Residence',
        userId: 6,
        address: '1988 Country Road',
        city: 'Winter River',
        state: 'Connecticut',
        country: 'United States',
        latitude: 41.807736,
        longitude: -73.121678,
        rate: 180,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'Hogwarts Castle',
        userId: 7,
        address: 'Somewhere Hidden',
        city: 'Scottish Highlands',
        state: 'Scotland',
        country: 'United Kingdom',
        latitude: 57.051068,
        longitude: -3.227648,
        rate: 375,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'The Addams Mansion',
        userId: 8,
        address: '1313 Cemetery Lane',
        city: 'Westfield',
        state: 'New Jersey',
        country: 'United States',
        latitude: 40.667289,
        longitude: -74.330955,
        rate: 300,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      },
      {
        name: 'Shelter Mountain Inn',
        userId: 9,
        address: '1740 Lake Whatcom Blvd',
        city: 'Bellingham',
        state: 'Washington',
        country: 'United States',
        latitude: 48.704290,
        longitude: -122.322676,
        rate: 300,
        description: 'Scare cauldron afraid abomination black cat pumpkin boo. Black cat witch vampire spooky werewolf blood witch. Drive-in pumpkin cauldron monster haunted cauldron pumpkin. Candy drive-in werewolf boo pumpkin afraid haunted. Jack-o-lantern vampire pumpkin drive-in scare pumpkin afraid.'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Haunts', null, {});
  }
};
