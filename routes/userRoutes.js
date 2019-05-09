const usersRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Users = require("../models/users.js");

const Groups = require('../models/groups.js');

const fb = require("../middleware/firebase.js");
// fb.isAuthenticated


usersRouter.get("/", fb.isAuthenticated, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
      console.log(res)
    })
    .catch(error => res.send(error));
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Your profile was retrieved successfully.",
        user
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Your profile could not be found in the database.",
        user: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      user: {},
      message: "There was an error processing your request."
    });
  }
});

usersRouter.post("/register", fb.isAuthenticated, async (req, res) => {
  // if (!req.body.token) {
  //   return res
  //     .status(400)
  //     .json("We need the right registration credentials prior to logging in!");
  // } else {
    try {
      let newUser = req.body;
      if (newUser) {
        const user = await Users.register(newUser);
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Incomplete registration"
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  // }
})


usersRouter.post("/login", (req, res) => {
  if (!req.body.token) {
    return res
      .status(400)
      .json("We need the right registration credentials prior to logging in!");
  } else {
    let email = req.body.email;
    if (email) {
      Users.login({ email })
        .first()
        .then(() => {
            res.status(200).json({ message: `Welcome ${user.fullName}!` });
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ message: "Invalid email provided." });
    }
  }
});

usersRouter.get('/:id/groups', async (req, res) => {
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
