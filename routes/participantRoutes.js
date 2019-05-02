const participantRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Participant = require("../models/participants.js");
const Groups = require("../models/groups.js");



participantRouter.get("/", (req, res) => {
    Participant.findParticipant()
               .then(participant => {
                   res.status(200).json(participant)
               })
               .catch(error => {
                   res.status(500).send(error)
               })
})

participantRouter.get("/:id/participant", async (req, res) => {
    try {   
            let {id} = req.params;
            console.log(id)
            if(id){
               const group = await Groups.findGroupById(id);
               console.log(group)
               const participant = await Participant.findParticipantsByGroup(id)
               res.status(200).json({...group, participant});
            } else {
                res.status(400).json({message:`Group with id:${id} does not exist `})
            }
            
      
    } catch (error) {
        res.status(500).send(error.message);
    }
})

participantRouter.post("/add", async (req, res) => {
    try {
        const newParticipant = req.body;
        console.log(newParticipant)
        if(newParticipant) {
            const participant = await Participant.addParticipant(newParticipant)
            res.status(200).json(participant)
        } else {
            res.status(400).json({message: "Must enter all input fields"})
        }
        
    } catch(error) {
        res.status(500).send(error.message);
    }
})

participantRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if(id) {
            let participant = await Participant.delParticipant(id);
            res.status(200).json(participant)
        } else {
            res.status(400).json({message: "No participant by that id"})
        }
    } catch(error) {
        res.status(500).send(error.message)
    }
})


module.exports = participantRouter;