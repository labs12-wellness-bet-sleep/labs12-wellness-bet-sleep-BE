exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTbl => {
    usersTbl.increments();
    usersTbl.string("password").notNullable();
    usersTbl
      .string("firebase_id", 500)
      // .notNullable()
      .unique();
    usersTbl.string("profilePhoto");
    usersTbl
      .string("email")
      .notNullable()
      .unique();
    usersTbl.boolean("role");
    usersTbl.string("fullName").notNullable();
    usersTbl.json("SleepData");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
