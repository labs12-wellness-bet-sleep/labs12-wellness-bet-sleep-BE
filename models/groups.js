const db = require('../database/dbConfig.js');

module.exports = {
    addGroup,
    findGroupById,
    findGroup
}

async function addGroup(group) {
    const [id] = await db("group").insert(group).returning("id");
    return findGroupById(id);
}

function findGroup(){
    return db("group").select("group_name");
}

function findGroupById(id) {
    return db("group")
        .where({ id })
        .select(
            "id",
            "user_id",
            "group_name",
            "buy_in_amount",
            "start_date",
            "end_date",
            "join_code",
            "group_message",
            "pot_total"
            )
            .first();
}