const groupsRouter = require("express").Router();
const Group = require("../models/groups.js");
const groupdb = require("../database/dbConfig.js");
const Participant = require("../models/participants.js");

const uuidv4 = require("uuid/v4");

const fb = require("../middleware/firebase.js");

groupsRouter.get("/", fb.isAuthenticated, (req, res) => {
  Group.findGroup()
    .then(groups => {
      res.json(groups);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

groupsRouter.get("/:id", fb.isAuthenticated, async (req, res) => {
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
groupsRouter.get('/join/:joinCode', async (req, res) => {
  try {
    const matchingGroup = await Group.findGroupByJoinCode(req.params.joinCode);
    if(matchingGroup) {
      res.status(200).json(matchingGroup);
    } else {
      res.status(404).json({ message: 'No group by that join code'});
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
});

// groupsRouter.get('/:joinCode?', async (req, res) => {
//   const joinCode = req.params.joinCode;
//   try {
//     const group = await groupdb('group').whereRaw('joinCode = ?', [joinCode]);
//     if(group) {
//       res.status(200).json(group);
//     } else {
//       res.status(404).json({ message: 'No group by that join code'});
//     }
    
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// groupsRouter.get('/:joinCode?', async (req, res) => {
//   const joinCode = req.params.joinCode;
//  Group.findGroupByJoinCode().then(data => {
//    res.status(200).json(data);
//  }).catch(err => {
//    res.status(500).json({ message: `failed to get groups by ${joinCode} with error: ${err}`});
//  })
// })

groupsRouter.get("/:id/participant", async (req, res) => {

    try {   
           let {id} = req.params;
           const group = await Group.findGroupById(id);
           if(group) {
           
            const participant = await Group.findParticipantsByGroup(id)
           
            res.status(200).json({...group, participant});
           } else {
            res.status(400).json({message:`Group with id:${id} does not exist `})
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
    console.log(error);
    res.status(500).send(error.message);
  }
});

groupsRouter.post("/invite", fb.isAuthenticated, async (req, res) => {
  try {
    const {
      userId,
      groupName,
      buyInAmt,
      startDate,
      endDate,      
      groupMessage,
      userfirebase_id
    } = req.body;

    const [group] = await groupdb("group")
      .insert([
        {
          userfirebase_id: userfirebase_id,
          joinCode: uuidv4(),
          
          // groupName: groupName,
          // buyInAmt: buyInAmt,
          // startDate: startDate,
          // endDate: endDate,          
          // groupMessage: groupMessage
        }
      ])
      .returning("id");

    if (group) {
      const newGroup = await groupdb("group")
        .where({ userfirebase_id: group })
        .select(
          "id",
          "userId",
          "userfirebase_id",
          "groupName",
          "buyInAmt",
          "startDate",
          "endDate",
          "joinCode",
          "groupMessage",
          "potTotal"
        )
        .first();
      res.status(200).json(newGroup);
    } else {
      res.status(401).json({ message: "All entries must be entered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.put("/:id", fb.isAuthenticated, async (req, res) => {
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
