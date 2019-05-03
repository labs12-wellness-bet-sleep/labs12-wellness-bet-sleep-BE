const db = require('../database/dbConfig.js');

module.exports = {
    participantByiD,
    delParticipant,
    findParticipant,
    addParticipant,
    showGroupsforParticipant
}


async  function addParticipant(participant){
    const [id] = await db("participant")
                  .insert(participant)
                  .returning("id")
    return participantByiD(id)
}



function findParticipant() {
    return db("participant").
           select("participant.id",
                  "users.username",
                  "participant.venmoPhoto",
                  "participant.groupId")
                  .innerJoin("users", "participant.partUserId", "=", "users.id")
}

function participantByiD(id) {
    return db("participant")
          .where({partUserId:id})
          .select("participant.id",
                  "venmoPhoto",
                  "groupId",
                  "partUserId",
                  "users.username",
                  "users.id")
                  .innerJoin("users", "participant.partUserId", "=", "users.id")
                  .first()


}

function delParticipant(id) {
    return db("participant").where({id}).del();
}

function showGroupsforParticipant(id) {
    return db.select(
                     "group.id",
                     "group.userId",
                     "group.groupName",
                     "group.buyInAmt",
                     "group.startDate",
                     "group.endDate",
                     "group.groupMessage",
                     "group.potTotal")
                     .from("group")
                     .innerJoin("participant", "participant.partUserId", "=", "group.userId")
                     .where({partUserId: id})
                
}