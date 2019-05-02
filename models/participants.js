const db = require('../database/dbConfig.js');

module.exports = {
    findParticipantsByGroup,
    participantByiD,
    delParticipant,
    findParticipant
}

function findParticipantsByGroup(id) {

    // return db("participant")
    //          .where({ groupId : id })
    //          .innerJoin("users","participant.partUserId","=","users.id")
    return db.select("users.username", "participant.venmoPhoto")
             .from("participant")
             .innerJoin("users", "participant.partUserId", "=", "users.id")
             .where({ groupId: id})
                        
}

function findParticipant() {
    return db("participant")
}

function participantByiD(id) {
    return db("participant").where({id})
}

function delParticipant(id) {
    return db("participant").where({id}).del();
}