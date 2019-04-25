const db = require("../database/dbConfig.js");

module.exports = {
	register,
	login,
	find,
	findById
}

async function register(user) {
	const [id] = await db("users")
	.insert(user)
	.returning("id");

	return findById(id);;
}

function login(user) {
	return db("users").where("users");
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