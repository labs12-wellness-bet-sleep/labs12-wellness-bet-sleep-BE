const groupsRouter = require("express").Router();
const Group = require("../models/groups.js");
const userdb = require("../database/dbConfig.js");

groupsRouter.get("/", (req, res) => {
    Group.findGroup()
        .then(groups => {
            res.json(groups);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

groupsRouter.post("/create", async (req, res) => {
    try {
        let newGroup = req.body;
        if(newGroup) {
            const group = await Group.addGroup(newGroup);
            res.status(200).json(group)
        } else {
            res.status(401).json({message: "All entries must be entered"});
        }

    } catch(error) {
        res.status(500).send(error.message);
    }
})


module.exports = groupRouter;