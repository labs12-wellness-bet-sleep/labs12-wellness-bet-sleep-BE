const user = require('../models/users.js');
const bcrypt = require('bcryptjs');



exports.postUser = async (req, res) => {

  try {

    let newUser  = req.body;

    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;
    
    console.log(user.password)

    const users = await user.register(newUser);
    res.status(201).json(users)
  } catch(err) {
    res.status(500).json(err.message)
  }
} 

exports.loginUser = (req, res) => {
  let { username, password } = req.body;

  user.login({ username })
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
}




