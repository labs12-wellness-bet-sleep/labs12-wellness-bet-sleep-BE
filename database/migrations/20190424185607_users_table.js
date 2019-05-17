exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTbl => {
    usersTbl.increments();

    usersTbl
      .string("username")
      .unique();
    usersTbl.string("password").notNullable();
    usersTbl.string("profilePhoto");
    usersTbl
      .string("email")
      .notNullable()
      .unique();
    usersTbl.boolean("role");
    usersTbl.string("fullName").notNullable();
    usersTbl.string("SleepData");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
