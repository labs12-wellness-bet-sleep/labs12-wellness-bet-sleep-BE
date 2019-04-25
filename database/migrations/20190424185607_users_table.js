exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTbl => {
    usersTbl.increments();

    usersTbl
      .string("username", 50)
      .notNullable()
      // .unique();
    usersTbl.string("password", 50).notNullable();
    usersTbl.string("photoUrl");
    usersTbl
      .string("email")
      .notNullable()
      .unique();
    usersTbl.string("role");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
