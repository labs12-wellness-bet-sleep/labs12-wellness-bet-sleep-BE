const db = require("../database/dbConfig.js");

module.exports = {

  addGroup,
  findGroupById,
  findGroup,
  updateGroup
};


async function addGroup(group) {
  const [id] = await db("group")
    .insert(group)
    .returning("id");
  return findGroupById(id);
}





function updateGroup(id, changes) {
    return db("group")
        .where({ id })
        .update(changes, '*');
}

function findGroup() {
  return db("group").select(
    "id",
    "groupName",
    "buyInAmt",
    "startDate",
    "endDate",
    "groupMessage",
    "potTotal"
  )
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


