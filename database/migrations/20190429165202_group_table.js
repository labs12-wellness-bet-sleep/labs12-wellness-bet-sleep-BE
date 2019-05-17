const uuidv4 = require("uuid/v4");
exports.up = function(knex, Promise) {
  return knex.schema.createTable("group", groupTbl => {
    groupTbl.increments();
    groupTbl
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    groupTbl
      .string("userfirebase_id", 500)
      .unsigned()
      // .notNullable()
      .references("firebase_id")
      .inTable("users")
      .onUpdate('CASCADE');
    groupTbl.text("groupName")
      // .notNullable();
    groupTbl.decimal("buyInAmt")
    // .notNullable();
    groupTbl.date("startDate");
    groupTbl.date("endDate");
    groupTbl.uuid("joinCode").defaultTo(uuidv4());
    groupTbl.text("groupMessage");
    groupTbl.decimal("potTotal");
    groupTbl.dropForeign("userId");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("group");
};
