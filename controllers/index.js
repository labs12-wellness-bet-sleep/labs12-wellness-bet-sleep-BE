const usersRouter = require("express").Router();
const userdb = require("../database/dbConfig.js");
const Users = require("../models/users.js");

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

module.exports = usersRouter