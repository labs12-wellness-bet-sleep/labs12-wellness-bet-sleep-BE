const user = require('../models/users.js');



exports.postUser = async (req, res) => {
  
  try {
    
    const { username, email, password } = req.body;
    const newUser = await user.register({ username, email, password });
    res.status(201).json(newUser)
  } catch(err) {
    res.status(500).json(err.message)
  }
}  




