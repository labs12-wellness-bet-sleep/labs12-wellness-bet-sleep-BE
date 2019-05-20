const groupsRouter = require("express").Router();
const Group = require("../models/groups.js");
const groupdb = require("../database/dbConfig.js");
const Participant = require("../models/participants.js");
const sendgrid = require('@sendgrid/mail');

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

groupsRouter.get("/fb/:userfirebase_id", fb.isAuthenticated, async (req, res) => {
  try {
    const group = await Group.findGroupsByFirebaseId(req.params.userfirebase_id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "No group by that firebase id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.get('/join/:joinCode', fb.isAuthenticated, async (req, res) => {
  try {
    const matchingGroup = await Group.findGroupByJoinCode(req.params.joinCode);
    // const participants = await 
    if(matchingGroup) {
      res.status(200).json(matchingGroup);
    } else {
      res.status(404).json({ message: 'No group by that join code'});
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
});


// groupsRouter.get(`/:id/participant`, async (req, res) => {

//     try {   
//            let {id} = req.params;
//            const group = await Group.findGroupById(id);
//            if(group) {
           
//             const participant = await Group.findParticipantsByGroup(id)
           
//             res.status(200).json({...group, participant});
//            } else {
//             res.status(400).json({message:`Group with id:${id} does not exist `})
//             }
           
//     } catch (error) {

//     res.status(500).send(error.message);
//   }
// });

groupsRouter.get("/:id/participant/:joinLink", async (req, res) => {

  try {   
         let {id, joinLink} = req.params;
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

groupsRouter.get(`/:joinCode/participant`, fb.isAuthenticated, async (req, res) => {
  

  try {   
         let {joinCode} = req.params;
         const group = await Group.findGroupByJoinCode(joinCode);
         if(group) {
         
          const participant = await Group.findParticipantsByGroupJoinCode(joinCode)
         
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
    console.log("req body:", userfirebase_id)
    const joinCode = uuidv4();

    const [group] = await groupdb("group")
      .insert([
        {
          userfirebase_id: userfirebase_id,
          joinCode: joinCode,
          
          // groupName: groupName,
          // buyInAmt: buyInAmt,
          // startDate: startDate,
          // endDate: endDate,          
          // groupMessage: groupMessage
        }
      ])
      .returning("id");
      console.log(group);
      // console.log(joinCode, 'Join code');

    if (group) {
      const newGroup = await groupdb("group")
        .where({ userfirebase_id: userfirebase_id })
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
        console.log(newGroup);
        await sendgrid.send({
          to: 'mssemmi8@gmail.com',
          from: 'wellnessbetsleep@gmail.com',
          subject: 'Join Code',
          text: joinCode,
          // html:`<a href='/dashboard/'>Link To Your Group</a>`
      })
      res.status(200).json({newGroup});
    } else {
      res.status(401).json({ message: "All entries must be entered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

groupsRouter.put("/:id", fb.isAuthenticated, async (req, res) => {
  try {
    const [group] = await Group.updateGroup(req.params.id, req.body);
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
