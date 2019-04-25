const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  const userSeeds = num => {
    const users = [];
    for (let i = 0; i < num; i++) {
      users.push({
        username: faker.internet.userName(),
        password: bcrypt.hashSync("password", 4),
        photoUrl: faker.image.imageUrl(),
        email: faker.internet.email(),
        role: faker.name.jobTitle()
      });
    }

    return users;
  };
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(userSeeds(500));
    });
};
