const db = require('../database/dbConfig.js');

module.exports = {
    findParticipantsByGroup
}

function findParticipantsByGroup(id) {

    return db("participant")
             .where({ groupId : id })
             .innerJoin("group","participant.groupId","=","group.id")
                        
}