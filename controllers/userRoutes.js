const usersRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Users = require("../models/users.js");
const bcrypt = require('bcryptjs');

usersRouter.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
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

  usersRouter.post("/register", async (req, res) => {
    try {
      let newUser = req.body;
      if(newUser) {
        const hash = bcrypt.hashSync(newUser.password, 12);
        newUser.password = hash;
        const user = await Users.register(newUser);
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Incomplete registration"
        });
      }

    } catch(error) {
      res.status(500).send(error.message);
    }
  });

  usersRouter.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (username && password ) {
      Users.login({ username })
      .first()
      .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
    } else {
      res.status(401).json({message: "Invalid username or password"});
    }

  })

 

module.exports = usersRouter