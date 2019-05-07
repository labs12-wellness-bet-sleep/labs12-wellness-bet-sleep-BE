const groupsRouter = require("express").Router();
const Group = require("../models/groups.js");
const groupdb = require("../database/dbConfig.js");
const Participant = require("../models/participants.js");

const uuidv4 = require("uuid/v4");

const fb = require("../middleware/firebase.js");

groupsRouter.get("/", (req, res) => {
  Group.findGroup()
    .then(groups => {
      res.json(groups);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

groupsRouter.get("/:id", async (req, res) => {
  try {
    const group = await Group.findGroupById(req.params.id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "No group by that id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.get("/:id/participant", async (req, res) => {
  try {
    let { id } = req.params;

    if (id) {
      const group = await Group.findGroupById(id);
      console.log("group", group);
      const participant = await Group.findParticipantsByGroup(id);
      console.log("participant", participant);
      res.status(200).json({ ...group, participant });
    } else {
      res.status(400).json({ message: `Group with id:${id} does not exist ` });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.post("/create", async (req, res) => {
  try {
    let newGroup = req.body;
    if (newGroup) {
      const group = await Group.addGroup(newGroup);
      res.status(200).json(group);
    } else {
      res.status(401).json({ message: "All entries must be entered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.post("/invite", async (req, res) => {
  try {
    const {
      userId,
      groupName,
      buyInAmt,
      startDate,
      endDate,
      joinCode,
      groupMessage
    } = req.body;

    const group = await groupdb("group")
      .insert(
        [{ userId: userId,
        groupName: groupName,
        buyInAmt: buyInAmt,
        startDate: startDate,
        endDate: endDate,
        joinCode: uuidv4(),
        groupMessage: groupMessage}]
      )
      .returning("id");
    //   const newGroup = await groupdb("group")
    //   .where({ id: group })
    //   .select(
    //     "id",
    //     "userId",
    //     "groupName",
    //     "buyInAmt",
    //     "startDate",
    //     "endDate",
    //     "joinCode",
    //     "groupMessage",
    //     "potTotal"
    //   )
    //   .first();

    if (group) {
      res.status(200).json(group);
    } else {
      res.status(401).json({ message: "All entries must be entered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.put("/:id", async (req, res) => {
  try {
    const group = await Group.updateGroup(req.params.id, req.body);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "Group is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the group" });
  }
});

groupsRouter.delete("/:id", async (req, res) => {
  try {
    const groupiD = req.params.id;
    if (groupiD) {
      const group = await Group.delGroup(groupiD);
      res.status(200).json(group);
    } else {
      res.status(400).json({ message: "No group by that Id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = groupsRouter;
