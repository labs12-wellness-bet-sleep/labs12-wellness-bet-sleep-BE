const db = require('../database/dbConfig.js');

module.exports = {
    addGroup,
    findGroupById,
    findGroup,
    updateGroup
}

async function addGroup(group) {
    const [id] = await db("group").insert(group).returning("id");
    return findGroupById(id);
}

function findGroup(){
    return db("group").select("groupName");
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
            "groupMessage",
            )
            .first();
}

function updateGroup(id, changes) {
    return db("group")
        .where({ id })
        .update(changes, '*');
}