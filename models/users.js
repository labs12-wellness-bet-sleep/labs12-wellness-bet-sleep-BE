const db = require('../database/dbConfig.js');


module.exports = {
	register,
	login,
	find,
	findById
}

function register(user) {
	return db("users").insert(user);
}

function login(user) {
	return db("users").get(user);
}

function find() {
	return db("users").select(
	  "id",
	  "username",
	  "password",
	  "photoUrl",
	  "email",
	  "role"
	);
  };

  function findById(id) {
	return userdb("users")
	  .where({ id })
	  .select("id", "username", "password", "photoUrl", "email", "role")
	  .first();
  }