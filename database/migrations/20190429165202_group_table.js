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
    groupTbl.text("groupName").notNullable();
    groupTbl.decimal("buyInAmt").notNullable();
    groupTbl.date("startDate");
    groupTbl.date("endDate");
    groupTbl.text("joinCode");
    groupTbl.text("groupMessage");
    groupTbl.decimal("potTotal");
    groupTbl.dropForeign("userId");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("group");
};
