const usersRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Users = require("../models/users.js");

const Groups = require('../models/groups.js');
const Participant = require('../models/participants.js');

const fb = require("../middleware/firebase.js");
// fb.isAuthenticated


usersRouter.get("/", fb.isAuthenticated, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
      // console.log(res)
    })
    .catch(error => res.send(error));
});

usersRouter.get("/:id", fb.isAuthenticated, async (req, res) => {
  console.log('user id')
  try {
    console.log('hello')
    const user = await Users.findById(req.params.id);
    console.log(user, 'user by id')
    const userGroups = await Participant.showGroupsforParticipant(user.firebase_id)
    if (user) {
      res.status(200).json({
        error: false,
        message: "Your profile was retrieved successfully.",
        user,
        groups: userGroups
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be found in the database.",
        user: {}
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      user: {},
      message: "There was an error processing your request."
    });
  }
});

usersRouter.post("/register",  async (req, res) => {
  // if (!req.body.token) {
  //   // console.log(req.body.token)
  //   return res
  //     .status(400)
  //     .json("We need the right registration credentials prior to logging in!");
  // } else {
    try {
      
      let newUser = req.body;

      if (newUser) {
        newUser.password = "password";
        const user = await Users.register(newUser);
        console.log("here", newUser)
        res.status(200).json({
          
          user,
          message: "Thank you for Registering"
        });
      } else {
        res.status(404).json({
          message: "Incomplete registration"
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
      // console.log(error, 'register error')
    }
  // }
})


usersRouter.put("/:id", fb.isAuthenticated, async (req, res) => {
  try {
      console.log("What we are placing, ", req.body);
      const user = await Users.updateUser(req.params.id, req.body);
      if(user){
          res.status(200).json(user);
      } else {
          res.status(404).json({message : "user is not found"});
      }
  } catch(error) {
      res.status(500).json({message: "Error updating the group"});
  }
});


usersRouter.get("/login/:id", fb.isAuthenticated, (req, res) => {
  // if (!req.body.token) {
  //   return res
  //     .status(400)
  //     .json("We need the right registration credentials prior to logging in!");
  // } else {
    if (req.params.id) {
      console.log(req.params.id, 'req params id')
      Users.login(req.params.id)
        .then((user) => {
          console.log(user, 'login by id')
            res.status(200).json({ message: `Welcome ${user.email}!` });
        })
        .catch(error => {
          res.status(500).json(error);
          console.log(error)
          
        });
    } else {
      res.status(401).json({ message: "Invalid email provided." });
    }
});

usersRouter.get('/:id/groups', fb.isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    const groups = await Groups.getGroupsByUser(id);
    if(user) {
      res.status(200).json({ ...user, groups });      
    } else {
      res.status(404).json({ message: 'User not found'})
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = usersRouter;
