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
          venmoPhoto: faker.image.imageUrl(),
          partUserId: faker.random.uuid(),
          
        },

        {
          groupId: 1,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: faker.random.uuid(),
        },
        {
          groupId: 2,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: faker.random.uuid(),
        },
        {
          groupId: 3,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: faker.random.uuid(),
        },
        {
          groupId: 3,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: faker.random.uuid(),
        }
      ]);
    });
};
