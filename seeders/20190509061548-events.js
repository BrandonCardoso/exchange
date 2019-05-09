'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Sample Event #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ut arcu nec efficitur. Aliquam et vulputate mauris. Pellentesque in sagittis quam. Nam lobortis molestie felis, a aliquam tellus finibus quis. Nullam sagittis quam finibus est vehicula fermentum. Aliquam non pellentesque felis, non finibus orci. Ut vehicula elit pharetra, lobortis risus et, consequat purus.',
        start_time: '2019-05-09 04:42:05',
        end_time: '2019-05-09 06:42:05',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(39.807222 -76.984722)'),
        organizer_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sample Event #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ut arcu nec efficitur. Aliquam et vulputate mauris. Pellentesque in sagittis quam. Nam lobortis molestie felis, a aliquam tellus finibus quis. Nullam sagittis quam finibus est vehicula fermentum. Aliquam non pellentesque felis, non finibus orci. Ut vehicula elit pharetra, lobortis risus et, consequat purus.',
        start_time: '2019-05-09 04:42:05',
        end_time: '2019-05-09 06:42:05',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(39.807222 -76.984722)'),
        organizer_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {})
  }
};
