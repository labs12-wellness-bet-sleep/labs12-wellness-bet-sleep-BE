exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTbl => {
    usersTbl.increments();

    usersTbl
      .string("username")
      .notNullable()
      .unique();
   
    usersTbl.string("password").notNullable();

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
