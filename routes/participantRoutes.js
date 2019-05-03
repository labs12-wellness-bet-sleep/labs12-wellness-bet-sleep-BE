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

participantRouter.get("/:id", async (req, res) => {
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
            //    console.log("groups", groups)
               const groups = await Participant.showGroupsforParticipant(id)
               console.log("participant", participant)
               res.status(200).json({...participant, groups});
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