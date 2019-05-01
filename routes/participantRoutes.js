const participantRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const db = require("../models/participants.js");

participantRouter.get("/:id", async (req, res) => {
    try {   
            let id = req.params.id;
            console.log(id)
            if(id){
               const participant = await db.findParticipantsByGroup(id)
               res.status(200).json(participant);
            } else {
                res.status(400).json({message:`Group with id:${id} does not exist `})
            }
            
      
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = participantRouter;