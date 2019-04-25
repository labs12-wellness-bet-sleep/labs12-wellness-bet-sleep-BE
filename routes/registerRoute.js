const express = require('express');
const userControler = require('../controllers/users');

const router = express.Router();

router.post('/register', userControler.postUser);


module.exports = router;
