'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        event_id: 1,
        name: 'Sample Event #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ut arcu nec efficitur. Aliquam et vulputate mauris. Pellentesque in sagittis quam. Nam lobortis molestie felis, a aliquam tellus finibus quis. Nullam sagittis quam finibus est vehicula fermentum. Aliquam non pellentesque felis, non finibus orci. Ut vehicula elit pharetra, lobortis risus et, consequat purus.',
        start_time: '2019-05-09 04:42:05',
        end_time: '2019-05-09 06:42:05',
        location: '{"room":"Top Floor","address":"301 Front Street West, Toronto, Ontario, Canada","latlng":{"lat":43.644,"lng":-79.3886}}',
        organizer_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: 2,
        name: 'Sample Event #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ut arcu nec efficitur. Aliquam et vulputate mauris. Pellentesque in sagittis quam. Nam lobortis molestie felis, a aliquam tellus finibus quis. Nullam sagittis quam finibus est vehicula fermentum. Aliquam non pellentesque felis, non finibus orci. Ut vehicula elit pharetra, lobortis risus et, consequat purus.',
        start_time: '2019-05-09 04:42:05',
        end_time: '2019-05-09 06:42:05',
        location: '{"room":"Top Floor","address":"301 Front Street West, Toronto, Ontario, Canada","latlng":{"lat":43.644,"lng":-79.3886}}',
        organizer_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
    .then(() => {
      return queryInterface.bulkInsert('Groups', [
        {
          event_id: 1,
          name: 'Participants',
          max_participants: 20,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          event_id: 2,
          name: 'Group 1',
          max_participants: 10,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          event_id: 2,
          name: 'Group 2',
          max_participants: 30,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {})
      .then(() => {
        return queryInterface.bulkDelete('Groups', null, {})
      })
  }
};
