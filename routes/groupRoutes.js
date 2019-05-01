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

groupsRouter.get("/:id", async (req, res) => {
    try {
        const group = await Group.findGroupById(req.params.id);
        console.log(group)
        if(group) {
            res.status(200).json(group)
        } else {
            res.status(404).json({message: "No group by that id"})
        }
    } catch(error){
        res.status(500).send(error.message);
    }
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

groupsRouter.put("/:id", async (req, res) => {
    try {
        const group = await Group.updateGroup(req.params.id, req.body);
        if(group){
            res.status(200).json(group);
        } else {
            res.status(404).json({message : "Group is not found"});
        }
    } catch(error) {
        res.status(500).json({message: "Error updating the group"})
    }
})


module.exports = groupsRouter;