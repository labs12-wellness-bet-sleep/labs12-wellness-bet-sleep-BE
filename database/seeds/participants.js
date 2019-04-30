const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("participant")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("participant").insert([
        {
          groupId: 1,
          participantName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 1
        },

        {
          groupId: 1,
          participantName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 2
        },
        {
          groupId: 2,
          participantName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 3
        },
        {
          groupId: 3,
          participantName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 4
        },
        {
          groupId: 3,
          participantName: `${faker.name.firstName()} ${faker.name.lastName()}`,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 1
        }
      ]);
    });
};
