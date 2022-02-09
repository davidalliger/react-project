'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        url: 'https://static.wikia.nocookie.net/ghostbusters/images/7/71/SlimergbII720p001.png/revision/latest/scale-to-width-down/776?cb=20121005091456'
      },
      {
        userId: 2,
        url: 'https://www.tvguide.com/a/img/resize/77963a1235bd43bfeb05f87aefa3f9bd15825b40/hub/2018/11/06/09f601b7-3842-436a-83c1-e839347b60f8/hillhouse-poppy.png?auto=webp&fit=crop&height=1080&width=1920'
      },
      {
        userId: 3,
        url: 'https://quizizz.com/_media/questions/b518da38-128c-4a80-bf7d-ab5d353cf395_900_900'
      },
      {
        userId: 4,
        url: 'https://static.wikia.nocookie.net/stephenking/images/a/a5/Thegradytwins.jpeg/revision/latest/scale-to-width-down/643?cb=20190908020001'
      },
      {
        userId: 5,
        url: 'https://www.thedigitalfix.com/wp-content/uploads/2021/11/gozer-explained-2.jpg'
      },
      {
        userId: 6,
        url: 'https://static.wikia.nocookie.net/beetlejuice/images/4/47/Rs_500x532-150217133120-lydia.jpg/revision/latest/scale-to-width-down/500?cb=20200120224343'
      },
      {
        userId: 7,
        url: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/10/30/10/hpatsc-sh01.jpg?quality=75&width=990&auto=webp&crop=982:726,smart'
      },
      {
        userId: 8,
        url: 'https://static.wikia.nocookie.net/addamsfamily/images/b/b9/F3.jpg/revision/latest?cb=20170324003822'
      },
      {
        userId: 9,
        url: 'https://static.wikia.nocookie.net/villains/images/5/5d/Samara_Morgan.v1.jpg/revision/latest/scale-to-width-down/1000?cb=20180419112621'
      },
      {
        hauntId: 1,
        url: 'https://i.guim.co.uk/img/media/796041dfc9f5d09e2195dc8fedac64d2d54730dd/19_106_4444_2665/master/4444.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=a70aba14781ea2ae9ea2d0ec216fb93d'
      },
      {
        hauntId: 2,
        url: 'https://static.wikia.nocookie.net/casper/images/9/96/Whipstaff_Manor.jpg'
      },
      {
        hauntId: 3,
        url: 'https://static.wikia.nocookie.net/stephenking/images/a/a7/The_Overlook_Hotel.jpg'
      },
      {
        hauntId: 4,
        url: 'https://static.wikia.nocookie.net/marvelcrossroads/images/7/78/Loc_ny_55cpw_movie07.jpg'
      },
      {
        hauntId: 5,
        url: 'https://static.wikia.nocookie.net/timburton/images/0/03/443FE8EB-8D60-475C-902D-C7AFC75EAAC3.jpeg'
      },
      {
        hauntId: 6,
        url: 'https://wallpaperaccess.com/full/562431.jpg'
      },
      {
        hauntId: 7,
        url: 'https://i.pinimg.com/564x/73/ba/13/73ba13f08f4fa92802a59efa0778c16c.jpg'
      },
      {
        hauntId: 8,
        url: 'https://www.gbhbl.com/wp-content/uploads/2016/08/thering04.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Images', null, {});
  }
};
