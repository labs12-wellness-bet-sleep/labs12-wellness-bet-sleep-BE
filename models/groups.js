const db = require("../database/dbConfig.js");

module.exports = {
  addGroup,
  findGroupById,
  findGroup,
  updateGroup,
  delGroup,
  findParticipantsByGroup,
  findGroupByJoinCode,
  getGroupsByUser
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
    .update(changes, "*");
}

function findGroup() {
  return db("group").select(
    "id",
    'userId',
    "groupName",
    "buyInAmt",
    "startDate",
    "endDate",
    "groupMessage",
    "potTotal",
    "joinCode"
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


function getGroupsByUser(id) {
  return db("group").where({ userId: id });
}

function findGroupByUserId(id) {
  return db("group")
    .where({ userId: id })
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

function delGroup(id) {
  return db("group")
    .where({ id })
    .del();
}

function findParticipantsByGroup(id) {
  return db
    .select("users.username", "users.profilePhoto", "participant.venmoPhoto")
    .from("participant")
    .innerJoin("users", "participant.partUserId", "=", "users.id")
    .where({ groupId: id });
}

function findGroupByJoinCode(joinCode) {
  return db("group")
    .where({ joinCode })
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
    
}
