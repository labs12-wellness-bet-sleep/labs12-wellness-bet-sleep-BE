const participantRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Participant = require("../models/participants.js");
const Groups = require("../models/groups.js");
const fb = require("../middleware/firebase.js");

participantRouter.get("/", fb.isAuthenticated, (req, res) => {
  Participant.findParticipant()
    .then(participant => {
      res.status(200).json(participant);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


participantRouter.get("/:id", fb.isAuthenticated,  async (req, res) => {
    try {
        const {id} = req.params;
        if(id){
            const participant = await Participant.participantByiD(id)
            res.status(200).json(participant)
        } else {
            res.status(400).json({message: "No participant with that id"})
        }
    } catch(error) {
        res.status(500).json(error.message)
    }
})

participantRouter.get("/:id/groups", async (req, res) => {
    try {   
            const {id} = req.params;
            if(id){
                console.log("id", id)
               const participant = await Participant.participantByiD(id);
               
               const groups = await Participant.showGroupsforParticipant(id)
               console.log("groups", groups)
               console.log("participant", participant)
               res.status(200).json({...participant, groups});
            } else {
                res.status(400).json({message:`Group with id:${id} does not exist `})
            }
            
      
    } catch (error) {
        res.status(500).send(error.message);
    }
 
});


participantRouter.put("/:id", fb.isAuthenticated, async (req, res) => {
  try {
      const participant = await Participant.updateParticipant(req.params.id, req.body);
      if(participant){
          res.status(200).json(participant);
      } else {
          res.status(404).json({message : "Participant is not found"});
      }
  } catch(error) {
      res.status(500).json({message: "Error updating the group"});
  }
});

participantRouter.post("/add", fb.isAuthenticated, async (req, res) => {
  try {
    const newParticipant = req.body;
    // console.log(newParticipant)
    if (newParticipant) {
      const participant = await Participant.addParticipant(newParticipant);
      console.log(participant, 'add participant')
      res.status(200).json(participant);

    } else {
      res.status(400).json({ message: "Must enter all input fields" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
});

participantRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let participant = await Participant.delParticipant(id);
      res.status(200).json(participant);
    } else {
      res.status(400).json({ message: "No participant by that id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});





module.exports = participantRouter;
