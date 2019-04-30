const db = require("../database/dbConfig.js");

module.exports = {
  addGroup,
  findGroupById,
  findGroup
};

async function addGroup(group) {
  const [id] = await db("group")
    .insert(group)
    .returning("id");
  return findGroupById(id);
}

function findGroup() {
  return db("group").select(
    "groupName",
    "buyInAmt",
    "startDate",
    "endDate",
    "groupMessage",
    "potTotal"
  );
}

function findGroupById(id) {
  return db("group")
    .where({ id })
    .select(
      "id",
      "userId",
      "groupName",
      "buyInAmt",
      "startDate",
      "endDate",
      "joinCode",
      "groupMessage",
      "potTotal"
    )
    .first();
}
