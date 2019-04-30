exports.up = function(knex, Promise) {
  return knex.schema.createTable("participant", partcpntTbl => {
    partcpntTbl.increments();
    partcpntTbl
      .integer("groupId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("group")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    partcpntTbl.string("participantName").notNullable();
    partcpntTbl.boolean("paid");
    partcpntTbl.text("venmoPhoto");
    partcpntTbl
      .integer("partUserId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    partcpntTbl.dropForeign("groupId");
    partcpntTbl.dropForeign("partUserId");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("participant");
};
