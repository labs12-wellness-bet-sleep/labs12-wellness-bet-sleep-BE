const bcrypt = require('bcryptjs');
const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  const userSeeds = num => {
    const users = [];
    for (let i = 0; i <num; i++) {
      users.push({
        username: faker.name.findName(),
        password: bcrypt.hashSync('password', 10),
        profilePhoto: faker.image.imageUrl(),
        email: faker.internet.email(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`
      })
    }
    return users;
  }
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(userSeeds(500));
    });
};
