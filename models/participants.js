const db = require("../database/dbConfig.js");
const {findGroupByJoinCode} = require('./groups.js');

module.exports = {
  participantByiD,
  delParticipant,
  findParticipant,
  addParticipant,
  showGroupsforParticipant,
  updateParticipant
};

async function addParticipant(participant) {
  const [id] = await db("participant")
    .insert(participant)
    .returning("id");
  const participantObj = await participantByiD(id);
  console.log(participantObj, 'participantObj')
  const group = await findGroupByJoinCode(participantObj.groupId);
  console.log(group);
  return group;
}

// async function findParticipant() {
//  const result = await db("participant")
//     .select(
//       "participant.id",
//       "users.fullName",
//       "participant.venmoPhoto",
//       "participant.groupId"
//     )
//     .innerJoin("users", "participant.partUserId", "=", "users.firebase_id");
//     console.log(result);
// }

function findParticipant() {
  return db('participant');
}

function participantByiD(firebase_id) {
  return db("participant")
    .where({ id: firebase_id })
    .select(
      "participant.id",
      "venmoPhoto",
      "groupId",
      "partUserId",
      "participant.paid"
    )
    .first();
}

function updateParticipant(id, changes) {
  return db("participant")
    .where({ id })
    .update(changes, "*");
}

function delParticipant(id) {
  return db("participant")
    .where({ id })
    .del();
}

function showGroupsforParticipant(id) {
  return db
    .select(
      "group.id",
      "group.userId",
      "group.groupName",
      "group.buyInAmt",
      "group.startDate",
      "group.endDate",
      "group.groupMessage",
      "group.potTotal"
    )
    .from("group")
    .innerJoin("participant", "participant.groupId", "=", "group.id")
    .where({ "participant.id": id });
}
