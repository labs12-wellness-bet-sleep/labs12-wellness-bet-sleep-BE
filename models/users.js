const db = ("../database/dbConfig.js");

module.exports = {
	register,
	login,
	getAllUsers
}

function register(user) {
	return db("users").insert(user);
}

function login(user) {
	return db("users").get(user);
}

function getAllUsers() {
	return db("users_table")
}