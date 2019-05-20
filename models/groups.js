const db = require("../database/dbConfig.js");

module.exports = {
  addGroup,
  findGroupById,
  findGroup,
  updateGroup,
  delGroup,
  findParticipantsByGroup,
  findGroupByJoinCode,
  findParticipantsByGroupJoinCode,
  findGroupsByFirebaseId
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
    "groupName",
    "userfirebase_id",
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


function delGroup(id) {
  return db("group")
    .where({ id })
    .del();
}



function findParticipantsByGroup(id) {

  return db.select("participant.id", "users.fullName","users.profilePhoto","participant.venmoPhoto", "participant.paid")
           .from("participant")
           .innerJoin("users", "participant.partUserId", "=", "users.firebase_id")
           .where({ groupId: id})                    
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

function findParticipantsByGroupJoinCode(joinCode) {

  return db.select("participant.id", "users.fullName","users.profilePhoto","participant.venmoPhoto", "participant.paid")
           .from("participant")
           .innerJoin("users", "participant.partUserId", "=", "users.firebase_id")
           .where({ groupId: joinCode})                    
};

function findGroupsByFirebaseId(userfirebase_id) {
  return db("group")
    .where({ userfirebase_id: userfirebase_id })
    .select(
      "id",
      "userId",
      "userfirebase_id",
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