exports.up = function(knex, Promise) {
  return knex.schema.createTable("participant", partcpntTbl => {
    partcpntTbl.increments();
    partcpntTbl
      .uuid("groupId")
      .unsigned()
      .notNullable()
      .references("joinCode")
      .inTable("group")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    partcpntTbl.boolean("paid");
    partcpntTbl.text("venmoPhoto");
    partcpntTbl
      .string("partUserId")
      .unsigned()
      .notNullable()
      .references("firebase_id")
      .inTable("users")
      .unique()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    partcpntTbl.dropForeign("groupId");
    partcpntTbl.dropForeign("partUserId");
    partcpntTbl.json("SleepData");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("participant");
};
