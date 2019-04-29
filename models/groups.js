const db = require('../database/dbConfig.js');

module.exports = {
    addGroup,
    deleteGroup,
    findGroupById
}

async function addGroup(group) {
    return db("group").insert(group);
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