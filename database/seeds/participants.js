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
          partUserId: 1
        },

        {
          groupId: 1,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 2
        },
        {
          groupId: 2,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 3
        },
        {
          groupId: 3,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 4
        },
        {
          groupId: 3,
          venmoPhoto: faker.image.imageUrl(),
          partUserId: 5
        }
      ]);
    });
};
